from django.contrib.auth.models import User, Group
from rest_framework import serializers

from blog.models import BlogPost

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'username', 'email', 'groups')


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ('url', 'name')


class BlogPostSerializer(serializers.ModelSerializer):
    pub_date = serializers.DateTimeField()

    class Meta:
        model = BlogPost
        fields = ('id', 'post_title', 'post_text', 'pub_date')
