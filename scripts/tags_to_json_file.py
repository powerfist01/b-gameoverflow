import requests, json
from time import sleep
from datetime import datetime

tags_uri = 'https://api.rawg.io/api/tags'

for page_no in range(345,500):
  uri = tags_uri + '?page=' + str(page_no)
  print(uri)
  response = requests.get(uri)
  print(response.status_code)

  if(response.status_code == 200):
    res = response.json()
    filepath = '../data/tags/tags_pg_' + str(page_no) + '.json'
    with open(filepath,'w') as f:
      f.write(json.dumps(res))
  elif(response.status_code == 404):
    print("nope")
    break

  sleep(4)
