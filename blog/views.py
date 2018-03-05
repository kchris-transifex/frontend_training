# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib.auth.models import User
from rest_framework import viewsets
from blog.serializers import UserSerializer, BlogPostSerializer
from blog.models import BlogPost

class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer

 	
class BlogPostViewSet(viewsets.ModelViewSet):
    
    queryset = BlogPost.objects.all()
    serializer_class = BlogPostSerializer
