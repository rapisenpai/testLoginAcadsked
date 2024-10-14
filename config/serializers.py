from rest_framework import serializers
from apps.curriculum.models import Courses, CurriculumYear
from apps.user.models import GroupMember, Notification, User, UserGroup

class CoursesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Courses
        fields = ['course_id', 'course_code', 'course_description']
        
class GroupMemberSerializer(serializers.ModelSerializer):
    courses = CoursesSerializer(many=True, read_only=True)

    class Meta:
        model = GroupMember
        fields = ['user', 'courses']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'middle_name', 'last_name', 'profile_image']

class NotificationSerializer(serializers.ModelSerializer):
    sender = UserSerializer()
    class Meta:
        model = Notification
        fields = '__all__'