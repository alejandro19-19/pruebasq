FROM python:3

RUN useradd -m myuser

ENV PYTHONUNBUFFERED 1
RUN mkdir /code
WORKDIR /code
COPY requirements.txt /code/
RUN pip install -r requirements.txt
COPY core /code/core
COPY hotelNexus /code/hotelNexus
COPY hotelNexus/settings_dev.py /code/hotelNexus/settings.py
COPY manage.py /code/
RUN chown -R myuser:myuser /code && chmod -R 755 /code
ARG URL=0.0.0.0:4000

USER myuser

CMD ["sh", "-c", "python manage.py makemigrations core && python manage.py migrate && python manage.py runserver $URL"]

