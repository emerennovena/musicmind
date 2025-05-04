from django.shortcuts import render
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
from rest_framework.decorators import api_view
from rest_framework.response import Response

def index(request):
    return render(request, 'index.html')

sp = spotipy.Spotify(auth_manager=SpotifyClientCredentials(
                client_id='a0d8d2f148c2e4cee9cc971cdf7482cd5',
                client_secret='2994a6ed6cc8466db21a50c40bb641e3'))

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
