from rest_framework import serializers
from . import models

class HelloSerializer(serializers.Serializer):
    """Serializes a name field for testing our APIView"""
    name = serializers.CharField(max_length=25)
    last_name = serializers.CharField(max_length=20)

class FileUploadSerializer(serializers.HyperlinkedModelSerializer):
    #id = serializers.UUIDField()
    owner = serializers.SlugRelatedField(
        read_only=True,
        slug_field='id'
    )

    class Meta:
        model = models.FileUpload
        fields = ('id', 'owner', 'datafile','created_on')
        #fields = '__all__'
        read_only_fields = ('created_on', 'owner')

class UserProfileSerializer(serializers.ModelSerializer):
    """A serializer for our user profile objects"""
    #uuid = serializers.UUIDField()

    class Meta:
        model = models.UserProfile
        fields = ('id','email','name','last_name','password','is_company')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        """Create and return a new user"""

        user = models.UserProfile(
            email= validated_data['email'],
            name = validated_data['name'],
            last_name = validated_data['last_name'],
            is_company = validated_data['is_company']
        )

        user.set_password(validated_data['password'])
        user.save()
        return user

class ProfileFeedItemSerializer(serializers.ModelSerializer):
    #id = serializers.UUIDField()
    """A serializer for profile feed item"""
    class Meta:
        model = models.ProfileFeedItem
        fields = ('id','user_profile','status_text','created_on')
        extra_kwargs = {'user_profile': {'read_only': True}}


class ProfileScholarshipItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.ProfileScholarshipItem
        fields = ('id','user_profile','name','detail','price','url','tag1','tag2','tag3','tag4','tag5','created_on')
        extra_kwargs = {'user_profile': {'read_only': True}}