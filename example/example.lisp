(defvar testy (require "../lib/testy"))

(testy.subject "Hello"
  (lambda (hello)
    (hello.should 'be "Hello")
    (hello.should 'not 'be "World")
    (hello.should 'start-with "He")
    (hello.should "start with" "H")
    (hello.should 'not 'start-with "Wo")
    (hello.should 'match /ello/)
    (hello.should 'not 'match /squic/)))

(testy.subject { foo 'bar }
  (lambda (hash)
    (hash.should 'have 'foo 'bar)
    (hash.should 'not 'have 'bib 37)))
