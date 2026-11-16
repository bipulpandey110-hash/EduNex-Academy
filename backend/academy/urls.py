from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import StudentViewSet, TeacherViewSet, CourseViewSet, BatchViewSet, AttendanceViewSet, FeePaymentViewSet, AssignmentViewSet, ExamResultViewSet, EnquiryViewSet, NoticeViewSet, dashboard_summary
router=DefaultRouter()
router.register('students',StudentViewSet)
router.register('teachers',TeacherViewSet)
router.register('courses',CourseViewSet)
router.register('batches',BatchViewSet)
router.register('attendance',AttendanceViewSet)
router.register('fees',FeePaymentViewSet)
router.register('assignments',AssignmentViewSet)
router.register('results',ExamResultViewSet)
router.register('enquiries',EnquiryViewSet)
router.register('notices',NoticeViewSet)
urlpatterns=[path('',include(router.urls)),path('dashboard/summary/',dashboard_summary)]
