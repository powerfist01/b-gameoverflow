import requests, json
from time import sleep
from datetime import datetime

tags_uri = 'https://api.rawg.io/api/games'

for page_no in range(300,500):
  uri = tags_uri + '?page=' + str(page_no)
  print(uri)
  response = requests.get(uri)

  if(response.status_code == 200):
    res = response.json()
    filepath = '../data/games/games_pg_' + str(page_no) + '.json'
    with open(filepath,'w') as f:
      f.write(json.dumps(res))
    print(res)
  elif(response.status_code == 404):
    break

  sleep(1)
