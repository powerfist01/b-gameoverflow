from rake_nltk import Rake

# Uses stopwords for english from NLTK, and all puntuation characters by
# default
r = Rake()

text = '''
    Valorant is one of the highly popular first-person shooter titles from Riot and the game has been out for more than a month now. The FPS tactical shooter has seen a lot of improvements since its release on closed beta and it continues to evolve. However, the game is also plagued with a number of bugs and error codes which is actually common for a huge and graphics-intensive video game.

    Nonetheless, these mysterious error messages can be quite frustrating for players as they block access when trying to log into the game or during play sessions. Valorant error 43 is one of the many error codes that users have been encountering while trying to play the FPS game. Users are also often greeted with this error when attempting to connect to the game servers after downloading a patch.
'''

# Extraction given the text.
r.extract_keywords_from_text(text)

# Extraction given the list of strings where each string is a sentence.
# r.extract_keywords_from_sentences(<list of sentences>)

# To get keyword phrases ranked highest to lowest.
phrases = r.get_ranked_phrases()

print(phrases)
# To get keyword phrases ranked highest to lowest with scores.
phrases_ranked = r.get_ranked_phrases_with_scores()
print()
print(phrases_ranked)