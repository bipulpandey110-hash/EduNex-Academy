from django.conf import settings
from django.db import models

class Student(models.Model):
    STATUS=[('active','Active'),('inactive','Inactive'),('pending','Pending')]
    user=models.OneToOneField(settings.AUTH_USER_MODEL,on_delete=models.CASCADE,related_name='student_profile',null=True,blank=True)
    student_id=models.CharField(max_length=24,unique=True)
    full_name=models.CharField(max_length=140)
    email=models.EmailField(blank=True)
    phone=models.CharField(max_length=20,blank=True)
    current_class=models.CharField(max_length=60,blank=True)
    program=models.ForeignKey('Course',on_delete=models.SET_NULL,null=True,blank=True,related_name='students')
    status=models.CharField(max_length=12,choices=STATUS,default='active')
    joined_on=models.DateField(auto_now_add=True)
    def __str__(self): return f'{self.student_id} — {self.full_name}'

class Teacher(models.Model):
    user=models.OneToOneField(settings.AUTH_USER_MODEL,on_delete=models.CASCADE,related_name='teacher_profile',null=True,blank=True)
    teacher_id=models.CharField(max_length=24,unique=True)
    full_name=models.CharField(max_length=140)
    email=models.EmailField(blank=True)
    subject=models.CharField(max_length=100)
    phone=models.CharField(max_length=20,blank=True)
    active=models.BooleanField(default=True)
    def __str__(self): return f'{self.teacher_id} — {self.full_name}'

class Course(models.Model):
    title=models.CharField(max_length=140)
    category=models.CharField(max_length=60,blank=True)
    description=models.TextField(blank=True)
    target_level=models.CharField(max_length=80,blank=True)
    duration=models.CharField(max_length=80,blank=True)
    fee=models.DecimalField(max_digits=10,decimal_places=2,default=0)
    active=models.BooleanField(default=True)
    created_at=models.DateTimeField(auto_now_add=True)
    def __str__(self): return self.title

class Batch(models.Model):
    name=models.CharField(max_length=100)
    course=models.ForeignKey(Course,on_delete=models.CASCADE,related_name='batches')
    teacher=models.ForeignKey(Teacher,on_delete=models.SET_NULL,null=True,blank=True,related_name='batches')
    start_time=models.TimeField(null=True,blank=True)
    end_time=models.TimeField(null=True,blank=True)
    room=models.CharField(max_length=60,blank=True)
    active=models.BooleanField(default=True)
    def __str__(self): return self.name

class Attendance(models.Model):
    STATUS=[('present','Present'),('absent','Absent'),('late','Late')]
    student=models.ForeignKey(Student,on_delete=models.CASCADE,related_name='attendance')
    batch=models.ForeignKey(Batch,on_delete=models.CASCADE,related_name='attendance',null=True,blank=True)
    date=models.DateField()
    status=models.CharField(max_length=10,choices=STATUS,default='present')
    marked_by=models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.SET_NULL,null=True,blank=True)
    note=models.CharField(max_length=250,blank=True)
    class Meta: unique_together=('student','batch','date')
    def __str__(self): return f'{self.student} · {self.date} · {self.status}'

class FeePayment(models.Model):
    STATUS=[('paid','Paid'),('pending','Pending'),('overdue','Overdue')]
    student=models.ForeignKey(Student,on_delete=models.CASCADE,related_name='payments')
    amount=models.DecimalField(max_digits=10,decimal_places=2)
    due_date=models.DateField(null=True,blank=True)
    paid_on=models.DateField(null=True,blank=True)
    status=models.CharField(max_length=10,choices=STATUS,default='pending')
    reference=models.CharField(max_length=80,blank=True)
    note=models.CharField(max_length=250,blank=True)
    created_at=models.DateTimeField(auto_now_add=True)
    def __str__(self): return f'{self.student} · {self.amount} · {self.status}'

class Assignment(models.Model):
    title=models.CharField(max_length=180)
    batch=models.ForeignKey(Batch,on_delete=models.CASCADE,related_name='assignments')
    description=models.TextField(blank=True)
    due_date=models.DateField(null=True,blank=True)
    created_by=models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.SET_NULL,null=True,blank=True)
    created_at=models.DateTimeField(auto_now_add=True)
    def __str__(self): return self.title

class ExamResult(models.Model):
    student=models.ForeignKey(Student,on_delete=models.CASCADE,related_name='results')
    course=models.ForeignKey(Course,on_delete=models.CASCADE,related_name='results')
    exam_name=models.CharField(max_length=140)
    score=models.DecimalField(max_digits=6,decimal_places=2)
    max_score=models.DecimalField(max_digits=6,decimal_places=2,default=100)
    exam_date=models.DateField(null=True,blank=True)
    remarks=models.CharField(max_length=250,blank=True)
    created_at=models.DateTimeField(auto_now_add=True)
    def __str__(self): return f'{self.student} · {self.exam_name}'

class Enquiry(models.Model):
    STATUS=[('new','New'),('contacted','Contacted'),('converted','Converted'),('closed','Closed')]
    full_name=models.CharField(max_length=140)
    phone=models.CharField(max_length=20)
    email=models.EmailField(blank=True)
    program=models.CharField(max_length=140,blank=True)
    current_class=models.CharField(max_length=80,blank=True)
    message=models.TextField(blank=True)
    status=models.CharField(max_length=12,choices=STATUS,default='new')
    created_at=models.DateTimeField(auto_now_add=True)
    def __str__(self): return f'{self.full_name} · {self.program}'

class Notice(models.Model):
    title=models.CharField(max_length=180)
    body=models.TextField()
    audience=models.CharField(max_length=20,default='all',choices=[('all','All'),('students','Students'),('teachers','Teachers')])
    published=models.BooleanField(default=False)
    created_at=models.DateTimeField(auto_now_add=True)
    def __str__(self): return self.title
