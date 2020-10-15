from django.shortcuts import render
from django.http import HttpResponse
from django.views.generic import View
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings

import logging
import urllib.request
import os

# Create your views here.
@csrf_exempt
def m_dice(request):
    try:
        url_status = urllib.request.urlopen(request.body.decode("utf-8")).getcode()
    except:
        return HttpResponse("URL IS NOT WORKING")
    if (url_status == 200):
        return HttpResponse("URL IS WORKING!")
    return HttpResponse("URL IS NOT WORKING")

class FrontendAppView(View):
    """
    Serves the compiled frontend entry point (only works if you have run `yarn
    run build`).
    """
    def get(self, request):
        print (os.path.join(settings.REACT_APP_DIR, 'build', 'index.html'))
        try:
            with open(os.path.join(settings.REACT_APP_DIR, 'build', 'index.html')) as f:
                return HttpResponse(f.read())
        except FileNotFoundError:
            logging.exception('Production build of app not found')
            return HttpResponse(
                """
                This URL is only used when you have built the production
                version of the app. Visit http://localhost:3000/ instead, or
                run `yarn run build` to test the production version.
                """,
                status=501,
            )