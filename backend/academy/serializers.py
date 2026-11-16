from rest_framework import serializers
from .models import Student, Teacher, Course, Batch, Attendance, FeePayment, Assignment, ExamResult, Enquiry, Notice
class StudentSerializer(serializers.ModelSerializer):
    program_title=serializers.CharField(source='program.title',read_only=True)
    class Meta: model=Student; fields='__all__'
class TeacherSerializer(serializers.ModelSerializer):
    class Meta: model=Teacher; fields='__all__'
class CourseSerializer(serializers.ModelSerializer):
    student_count=serializers.IntegerField(source='students.count',read_only=True)
    class Meta: model=Course; fields='__all__'
class BatchSerializer(serializers.ModelSerializer):
    course_title=serializers.CharField(source='course.title',read_only=True)
    teacher_name=serializers.CharField(source='teacher.full_name',read_only=True)
    class Meta: model=Batch; fields='__all__'
class AttendanceSerializer(serializers.ModelSerializer):
    student_name=serializers.CharField(source='student.full_name',read_only=True)
    class Meta: model=Attendance; fields='__all__'
class FeePaymentSerializer(serializers.ModelSerializer):
    student_name=serializers.CharField(source='student.full_name',read_only=True)
    class Meta: model=FeePayment; fields='__all__'
class AssignmentSerializer(serializers.ModelSerializer):
    batch_name=serializers.CharField(source='batch.name',read_only=True)
    class Meta: model=Assignment; fields='__all__'; read_only_fields=('created_by','created_at')
class ExamResultSerializer(serializers.ModelSerializer):
    student_name=serializers.CharField(source='student.full_name',read_only=True)
    course_title=serializers.CharField(source='course.title',read_only=True)
    class Meta: model=ExamResult; fields='__all__'
class EnquirySerializer(serializers.ModelSerializer):
    class Meta: model=Enquiry; fields='__all__'; read_only_fields=('status','created_at')
class NoticeSerializer(serializers.ModelSerializer):
    class Meta: model=Notice; fields='__all__'
