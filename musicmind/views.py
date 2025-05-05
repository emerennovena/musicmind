from django.shortcuts import render
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
from rest_framework.decorators import api_view
from rest_framework.response import Response
import os
from dotenv import load_dotenv

load_dotenv()

client_id = os.getenv('SPOTIFY_CLIENT_ID')
client_secret = os.getenv('SPOTIFY_CLIENT_SECRET')

sp = spotipy.Spotify(auth_manager=SpotifyClientCredentials(
                client_id=client_id,
                client_secret=client_secret))

def index(request):
    return render(request, 'index.html')

@api_view(['GET'])
def search_song(request):
    query = request.GET.get('query', None)
    if not query:
        return Response({'error': 'Query parameter is required'}, status=400)

    try:
        results = sp.search(q=query, limit=5, type='track')
        tracks = results.get('tracks', {}).get('items', [])

        songs = []
        for item in tracks:
            songs.append({
                'track_name': item['name'],
                'artist': item['artists'][0]['name'],
                'album': item['album']['name'],
                'image': item['album']['images'][0]['url'],
                'preview_url': item['preview_url'],
            })

        return Response({'songs': songs})

    except spotipy.exceptions.SpotifyException as e:
        return Response({'error': str(e)}, status=500)
