from django.db.models import Sum, Count
from django.http import JsonResponse
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .models import Student, Teacher, Course, Batch, Attendance, FeePayment, Assignment, ExamResult, Enquiry, Notice
from .serializers import StudentSerializer, TeacherSerializer, CourseSerializer, BatchSerializer, AttendanceSerializer, FeePaymentSerializer, AssignmentSerializer, ExamResultSerializer, EnquirySerializer, NoticeSerializer
from .permissions import IsStaffOrReadOnly, StaffOnly

@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def health(request):
    return Response({'status':'ok','service':'EduNex Academy API','version':'1.0.0'})

class PublicReadStaffWrite(viewsets.ModelViewSet):
    permission_classes=[IsStaffOrReadOnly]

class StudentViewSet(PublicReadStaffWrite):
    permission_classes=[StaffOnly]
    queryset=Student.objects.select_related('program').all().order_by('full_name')
    serializer_class=StudentSerializer
class TeacherViewSet(PublicReadStaffWrite):
    permission_classes=[StaffOnly]
    queryset=Teacher.objects.all().order_by('full_name')
    serializer_class=TeacherSerializer
class CourseViewSet(PublicReadStaffWrite):
    queryset=Course.objects.filter(active=True).annotate(_student_count=Count('students')).order_by('title')
    serializer_class=CourseSerializer
class BatchViewSet(PublicReadStaffWrite):
    permission_classes=[StaffOnly]
    queryset=Batch.objects.select_related('course','teacher').all().order_by('name')
    serializer_class=BatchSerializer
class AttendanceViewSet(PublicReadStaffWrite):
    permission_classes=[StaffOnly]
    queryset=Attendance.objects.select_related('student','batch').all().order_by('-date')
    serializer_class=AttendanceSerializer
class FeePaymentViewSet(PublicReadStaffWrite):
    permission_classes=[StaffOnly]
    queryset=FeePayment.objects.select_related('student').all().order_by('-created_at')
    serializer_class=FeePaymentSerializer
class AssignmentViewSet(PublicReadStaffWrite):
    permission_classes=[StaffOnly]
    queryset=Assignment.objects.select_related('batch').all().order_by('-created_at')
    serializer_class=AssignmentSerializer
    def perform_create(self, serializer): serializer.save(created_by=self.request.user if self.request.user.is_authenticated else None)
class ExamResultViewSet(PublicReadStaffWrite):
    permission_classes=[StaffOnly]
    queryset=ExamResult.objects.select_related('student','course').all().order_by('-exam_date')
    serializer_class=ExamResultSerializer
class EnquiryViewSet(viewsets.ModelViewSet):
    queryset=Enquiry.objects.all().order_by('-created_at')
    serializer_class=EnquirySerializer
    def get_permissions(self):
        if self.action=='create': return [permissions.AllowAny()]
        return [permissions.IsAdminUser()]
class NoticeViewSet(PublicReadStaffWrite):
    queryset=Notice.objects.filter(published=True).order_by('-created_at')
    serializer_class=NoticeSerializer
    def get_queryset(self):
        if self.request.user and self.request.user.is_staff: return Notice.objects.all().order_by('-created_at')
        return super().get_queryset()

@api_view(['GET'])
@permission_classes([permissions.IsAdminUser])
def dashboard_summary(request):
    return Response({'students':Student.objects.count(),'teachers':Teacher.objects.filter(active=True).count(),'courses':Course.objects.filter(active=True).count(),'batches':Batch.objects.filter(active=True).count(),'enquiries_new':Enquiry.objects.filter(status='new').count(),'fees_paid':FeePayment.objects.filter(status='paid').aggregate(total=Sum('amount'))['total'] or 0})
