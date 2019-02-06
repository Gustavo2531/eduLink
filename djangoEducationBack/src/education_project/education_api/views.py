from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework import filters
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.permissions import IsAuthenticated
from . import serializers
from . import models
from . import permissions

# Create your views here.
class HelloApiView(APIView):
    """Test Api View"""

    serializer_class = serializers.HelloSerializer


    def get(self, request, format=None):
        """Returns a list of APIView features"""

        an_apiview = [
            'Uses HTTP methos as function (get, post, patch, put, delete)',
            'It Is similar to a traditional Django View',
            'Gives you the most control over your logic',
            'Is mapped mannually to URLS'
        ]

        return Response({'message': 'Hello','an_apiview': an_apiview})


    def post(self,request):
        """Create a Hello message with our name"""
        serializer = serializers.HelloSerializer(data = request.data)

        if serializer.is_valid():
            name = serializer.data.get('name')
            last_name = serializer.data.get('last_name')
            message = 'Hello {0} {1}'.format(name, last_name)
            return Response({'message':message})
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk=None):
        """Handles updating on project"""

        return Response({'method':'put'})

    def patch(self, request, pk=None):

        return Response({'method':'patch'})

    def delete(self, request, pk=None):
        return Response({'method': 'delete'})

class HelloViewSet(viewsets.ViewSet):
    """Test API ViewSet"""
    serializer_class = serializers.HelloSerializer

    def list(self, request):
        """Return a Hello Message."""

        a_viewset = [
            'Uses action{list, create, retrieve,update, partial update}',
            'Automatically map to Urls using Router',
            'Provides more functionality with less code'
        ]

        return Response({'message':'Hello!', 'a_viewset':a_viewset})

    def create(self,request):
        """ Create a new hello message"""

        serializer = serializers.HelloSerializer(data = request.data)

        if serializer.is_valid():
            name = serializer.data.get('name')
            message = 'Hello {0}'.format(name)
            return Response({'message':message})
        else:
            return Response(
                serializer.errors, status=status.HTTP_400_BAD_REQUEST
            )

    def retrieve(self,request,pk=None):
        """Hnadles getting an Object by its ID."""

        return Response({'http_method':'GET'})

    def update(self,request, pk=None):
        """Handles updating an object"""

        return Response({'http_method':'PUT'})

    def partial_update(self,request,pk=None):
        """Handles updating part of an object"""
        return Response({'http_method':'PATCH'})

    def destroy(self,request,pk=None):

        return Response({'http_method':'DELETE'})

class UserProfileViewSet(viewsets.ModelViewSet):
    """Handles creating and updating profiles"""
    serializer_class = serializers.UserProfileSerializer
    queryset = models.UserProfile.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (permissions.UpdateOwnProfile,)
    filter_backends = (filters.SearchFilter,)
    search_fields = ('name','last_name','email',)

class LoginViewSet(viewsets.ViewSet):
    """Check Email and password and return an auth token"""

    serializer_class = AuthTokenSerializer

    def create(self,request):
        """Use the obtainAuthToken APIView to validate and create a token"""

        return ObtainAuthToken().post(request)

class UserProfileFeedViewSet(viewsets.ModelViewSet):
    """Check Email and password and return an auth token"""

    authentication_classes = (TokenAuthentication,)
    serializer_class = serializers.ProfileFeedItemSerializer
    queryset = models.ProfileFeedItem.objects.all()
    permission_classes = (permissions.PostOwnStatus,IsAuthenticated)

    def perform_create(self, serializer):
        """sets the user profile to the logged in user"""
        serializer.save(user_profile=self.request.user)

class ProfileScholarshipItemViewSet(viewsets.ModelViewSet):
    authentication_classes = (TokenAuthentication,)
    serializer_class = serializers.ProfileScholarshipItemSerializer
    queryset = models.ProfileScholarshipItem.objects.all()
    permission_classes = (permissions.PostOwnStatus,IsAuthenticatedOrReadOnly)

    def perform_create(self, serializer):
        """sets the user profile to the logged in user"""
        user_profile = self.request.user

        if user_profile.is_company:
            serializer.save(user_profile=self.request.user)
        else:
            print("Entre")
            return Response(
                serializer.errors, status=status.HTTP_400_BAD_REQUEST
            )





class FileUploadViewSet(viewsets.ModelViewSet):
    authentication_classes = (TokenAuthentication,)
    queryset = models.FileUpload.objects.all()
    serializer_class = serializers.FileUploadSerializer
    permission_classes = (permissions.PostOwnFile,IsAuthenticatedOrReadOnly)

    parser_classes = (MultiPartParser, FormParser,)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user,
                        datafile=self.request.data.get('datafile'))