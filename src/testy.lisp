(defvar util (require 'util)
  style (require "../colored.js/lib/colored.js")
  testy exports)

(set testy
  'tests 0
  'passes 0
  'failures 0
  'description [])

(defun test-object? (obj)
  (defined? obj.testy))

(defun matcher-for (matcher)
  (if (string? matcher)
      (or (get testy.should matcher) matcher)
    matcher))

(defun testy.should (obj matcher &rest matcher-args)
  (matcher-args.unshift obj)

  (defvar matcher (matcher-for matcher)
    result (try (apply matcher matcher-args)
                { description (concat (style.red "Error: ")
                                      e.message)
                  passed false }))

  (console.log (concat "["
                       (if result.passed (style.green 'pass)
                         (style.red 'fail))
                       "]\t " (util.inspect obj)
                       " should " result.description))

  (if result.passed (incr testy.passes)
    (incr testy.failures))

  result)

(defun testy.should.match (obj regex)
  { description (concat "match " regex)
    passed      (regex.test obj) })

(defun testy.should.be (obj expected)
  { description (concat "be " expected)
    passed      (= obj expected) })

(defun testy.should.have (obj key expected-value)
  { description (concat "have " key " equal to " expected-value)
    passed      (= (get obj key) expected-value) })

(defun testy.should.start-with (obj initial)
  { description (concat "start with " initial)
    passed      (= 0 (obj.index-of initial)) })

(set testy.should "start with" testy.should.start-with)

(defun testy.should.not (obj matcher &rest matcher-args)
  (matcher-args.unshift obj)
  (defvar result (apply (matcher-for matcher) matcher-args))
  { description (concat "not " result.description)
    passed      (not result.passed) })

(defun make-test-object (obj)
  (if (test-object? obj) obj
    (progn
      (defvar test-object {
        object obj
        testy  true })

      (defun test-object.should (&rest args)
        (args.unshift obj)
        (apply testy.should args))

      test-object)))

(defun testy.subject (subj to)
  (call to (make-test-object subj)))
