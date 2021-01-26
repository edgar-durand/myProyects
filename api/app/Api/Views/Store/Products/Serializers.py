from rest_framework import serializers
from rest_framework.relations import PrimaryKeyRelatedField

from Api.models import product, category


class ProductSerializers(serializers.ModelSerializer):
    category = serializers.StringRelatedField()

    class Meta:
        model = product
        fields = (
            'id', 'name', 'image', 'description', 'price_cost', 'price_vent', 'inStock', '_public', 'category')

class ProductCreateSerializers(serializers.ModelSerializer):
    class Meta:
        model = product
        fields = (
            'id', 'name', 'image', 'description', 'price_cost', 'price_vent', 'inStock', '_public', 'category')