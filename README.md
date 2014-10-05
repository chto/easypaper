Given a LaTeX document, compile a rich HTML document.  See test_website/test.html for a continually-updated proof of concept.

The current goal is to have three main functions:

1. **Easy-to-follow citation links**
  - _Trigger_: Click or hover over bibliographic reference (e.g. Smith and Bob 2001)
  - _Action_:  Tooltip with bibliographic info, optional abstract, and link to bibliographic entry (e.g. in ADS or arXiv) is displayed.

1. **Easy-to-reference figures, equations, and tables**
  - _Trigger_: Click or hover over figure or equation reference.
  - _Action_:  Tooltip with figure or equation is displayed, with options to resize as necessary.

1. **Easy lookup of jargon**
  - _Trigger_: Click or hover over "jargon"
  - _Action_:  Tooltip with short definition (pulled from some yet-unknown database) and links for more info, or a search link

Gratitude:
- PDF.js (v1.0.275)
- [https://github.com/hubgit/hubgit.github.com/tree/master/2011/11/pdftotext]
