import json
from os import remove
from sys import argv

def setup(name):
    with open('package.json', 'r+') as f:
        pkg = json.load(f)
        pkg["name"] = name
        pkg["repository"] = f"https://github.com/mikezzb/{name}.git"
        del pkg["scripts"]["bootstrap"]
        f.seek(0)
        f.truncate()
        json.dump(pkg, f, indent=2)
        f.write('\n')
    with open('example/package.json', 'r+') as f:
        pkg = json.load(f)
        deps = pkg["dependencies"]
        del deps["my-package"]
        deps[name] = "file:../lib"
        pkg["scripts"]["relink"] = f"yarn link {name}"
        f.seek(0)
        f.truncate()
        json.dump(pkg, f, indent=2)
        f.write('\n')
    with open('example/src/App.tsx', 'r+') as f:
        data = f.read()
        data = data.replace('my-package', name)
        f.seek(0)
        f.truncate()
        f.write(data)

name = input('Your package name: ')
setup(name)
remove(argv[0])
