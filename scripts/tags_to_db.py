import requests
from time import sleep
import pymongo
from pymongo import MongoClient
from datetime import datetime

client = MongoClient()

tags_uri = 'https://api.rawg.io/api/tags'

for page_no in range(20,21):
  uri = tags_uri + '?page=' + str(page_no)
  print(uri)
  response = requests.get(uri)

  if(response.status_code == 200):
    res = response.json()['results']
    for tag in res:
      print(tag['name'])
      db = client.gameoverflow
      tag = {
        'name': tag['name'],
        'slug': tag['slug'],
        'created_at': datetime.now()
      }

      tags = db.tags

      res = tags.insert_one(tag)
  elif(response.status_code == 404):
    break

  sleep(1)
