"""
Celery worker setup placeholder.

To enable later:
1. Install celery + redis: `pip install celery[redis]`
2. Start Redis with Docker
3. Configure Celery instance here
"""

# from celery import Celery
# celery_app = Celery(
#     "worker",
#     broker="redis://localhost:6379/0",
#     backend="redis://localhost:6379/0"
# )

# @celery_app.task
# def long_task(x, y):
#     return x + y
