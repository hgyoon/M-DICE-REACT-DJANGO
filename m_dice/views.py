#### OSM
import logging
import os
import json
import urllib.request
import requests
import numpy as np
#### Database
from django.http import HttpResponse, JsonResponse
from django.views.generic import View
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
from django.shortcuts import render
from django.forms.models import model_to_dict
from django.core import serializers
from .models import StreetInfo
from .geoid_loader import geoid_loader

def jsonParser2(data):
    # create 2d array
    lat_lon_arr = np.empty((0,2))
    for elements in data['elements']:
        if elements['type'] == 'node':
            lat = elements['lat']
            lon = elements['lon']
            lat_lon_arr = np.append(lat_lon_arr, np.array([[lat, lon]]), axis=0)
    # latLonArr.sort(axis = 0)
    lat_lon_arr = lat_lon_arr[lat_lon_arr[:,0].argsort()]
    # print(latLonArr)
    final_arr = np.append(np.array([lat_lon_arr[0]]), np.array([lat_lon_arr[-1]]), axis = 0)
    final_model = StreetInfo(startLng = final_arr[0][0], startLat = final_arr[0][1], endLng = final_arr[1][0], endLat = final_arr[1][1])
    # print(final_model.startLat)
    # final_model.save()
    final_dict = {"1": final_arr[0][0], "2":final_arr[0][1], "3":final_arr[1][0], "4":final_arr[1][1]}
    return final_dict

# Create your views here.
@csrf_exempt
def m_dice(request):
    overpass_url = "http://overpass-api.de/api/interpreter"
    maxDist = 10
    geoArray = []
    geoArray = np.array([(42.340429, 42.340861, 42.341262, 42.341491, 42.341816, 42.342062, 42.342398, 42.340907), (-83.090588, -83.088968, -83.087590, -83.086184, -83.084993, -83.083952, -83.087548, -83.086593)])
    overPassArray = []
    returnJson = {}
    count = 0
    for i in range(8):
        lat = geoArray[0][i]
        # print(lat)
        lng = geoArray[1][i]
        # print(lng)
        overpass_query = """
            [out:json];
            way
            (around:{},{},{})
            ["highway"="residential"];
            (
            ._;
            >;
            );
            out;
            """.format(maxDist, lat, lng)
        # print(overpass_query)
        overPassArray.append(overpass_query)
    # for i in overPassArray:
    #     response = requests.get(overpass_url, params={'data': i})
    #     data = response.json()
    #     # returnJson[count] = jsonParser2(data)
    #     count += 1
    # for model in StreetInfo.objects.all():
    #     result = model_to_dict(model)
    #     print(result)
    some_model = serializers.serialize("json", StreetInfo.objects.all())
    print(some_model)

    # print(StreetInfo.objects.all())
    # print(returnJson)
    # return HttpResponse(json.dumps(returnJson))
    return HttpResponse(serializers.serialize("json", StreetInfo.objects.all()))

@csrf_exempt
def get_geoid(request):
    data_list = geoid_loader()
    return HttpResponse(json.dumps(data_list))

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


    # try:
    #     url_status = urllib.request.urlopen(request.body.decode("utf-8")).getcode()
    # except:
    #     return HttpResponse("URL IS NOT WORKING")
    # if (url_status == 200):
    #     return HttpResponse("URL IS WORKING!")
    # return HttpResponse("URL IS NOT WORKING")