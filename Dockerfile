FROM python:3-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY requirements.txt /usr/src/app/

RUN pip3 install --no-cache-dir -r requirements.txt

COPY . /usr/src/app

COPY ./manage.py /usr/src/app/manage.py

EXPOSE 9000

CMD ./manage.py runserver 0.0.0.0:9000

