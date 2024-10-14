from django.shortcuts import get_object_or_404
from apps.user.models import User, UserGroup

def get_users_list(request):
    if request.user.user_type == 4:
        group_id = request.GET.get('group')
        
        if not group_id:
            return {
                'user_options': [],
            }

        user_institute = request.user.institute
        users = User.objects.all()

        if user_institute:
            users = users.filter(institute=user_institute)

        group = get_object_or_404(UserGroup, group_id=group_id)
        existing_members = group.groupmember_set.values_list('user_id', flat=True)
        users = users.exclude(id__in=existing_members)

        user_options = [
            {
          'value': user.id,
          'text': user.get_full_name(),
          'profile': user.profile_image.url if user.profile_image and user.profile_image.url else f"https://ui-avatars.com/api/?name={user.first_name.replace(' ', '')}{user.middle_name.replace(' ', '') if user.middle_name else ''}{user.last_name.replace(' ', '')}&background=random"
            }
            for user in users
        ]
        return {
            'user_options': user_options,
        }