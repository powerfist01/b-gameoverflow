import yake
from yake.highlight import TextHighlighter

text = '''
    Valorant is one of the highly popular first-person shooter titles from Riot and the game has been out for more than a month now. The FPS tactical shooter has seen a lot of improvements since its release on closed beta and it continues to evolve. However, the game is also plagued with a number of bugs and error codes which is actually common for a huge and graphics-intensive video game.

    Nonetheless, these mysterious error messages can be quite frustrating for players as they block access when trying to log into the game or during play sessions. Valorant error 43 is one of the many error codes that users have been encountering while trying to play the FPS game. Users are also often greeted with this error when attempting to connect to the game servers after downloading a patch.
'''

kw_extractor = yake.KeywordExtractor()
keywords = kw_extractor.extract_keywords(text)

# for kw in keywords:
# 	print(kw)

language = "en"
max_ngram_size = 3
deduplication_thresold = 0.9
deduplication_algo = 'seqm'
windowSize = 1
numOfKeywords = 20

custom_kw_extractor = yake.KeywordExtractor(lan=language, n=max_ngram_size, dedupLim=deduplication_thresold, dedupFunc=deduplication_algo, windowsSize=windowSize, top=numOfKeywords, features=None)
keywords = custom_kw_extractor.extract_keywords(text)

for kw in keywords:
    print(kw)


th = TextHighlighter(max_ngram_size = 3)
highlighted = th.highlight(text, keywords)

print(highlighted)