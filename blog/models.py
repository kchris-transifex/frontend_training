# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

class BlogPost(models.Model):
    post_text = models.CharField(max_length=200)
    pub_date = models.DateTimeField('date published')
