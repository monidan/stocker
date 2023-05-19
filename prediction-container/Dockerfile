FROM python:3.9

EXPOSE 8080

WORKDIR /app

RUN pip install numpy tensorflow pandas scikit-learn keras datetime flask flask-cors

COPY . /app
CMD [ "python3", "server.py" ]