# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

class BlogPost(models.Model):
    post_title = models.CharField(max_length=100, default=None)
    post_text = models.CharField(max_length=2000, default=None)
    pub_date = models.DateTimeField('date published')
