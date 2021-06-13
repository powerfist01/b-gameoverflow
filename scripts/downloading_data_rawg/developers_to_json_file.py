import requests, json
from time import sleep
from datetime import datetime

tags_uri = 'https://api.rawg.io/api/developers'

for page_no in range(1000,1500):
  uri = tags_uri + '?page=' + str(page_no) + '&page_size=40' + '&key=dfa6f12fa64a416884fbd7c37a6c2149'
  print(uri)
  response = requests.get(uri)

  if(response.status_code == 200):
    res = response.json()
    filepath = '../data/developers/developers_pg_' + str(page_no) + '.json'
    with open(filepath,'w') as f:
      f.write(json.dumps(res))
    print(res)
  elif(response.status_code == 404):
    break

  sleep(1)
