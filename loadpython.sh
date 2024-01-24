#!/bin/bash

# repository root scripts
python3 convert.py ;
python3 sitemap.py &

# sub-directory scripts
(
  cd build/law
  python3 generatePages.py
)

wait