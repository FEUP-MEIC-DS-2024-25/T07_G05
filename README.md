# T07_G05
Our work is an AI assistant for mutation tests selection. The user give us the code and the test code, and we generate mutation tests from the original tests. If the user provides us some context about what is supposed to do the program, we will select, by an IA, the tests that match the context.

---

### Python directory
Inside this directory, you have the file *script.sh* that is the only thing that you need to run to do mutations tests in *python*.

Because we use *mutmut* to generate mutations tests,so it's necessary to have the *mutmut* installed before running the *script.sh*. If you don't have it installed yet, run this command.
```bash
pip install mutmut
```

This *script.sh* file starts for running the command:
```bash
mut.py --target my_code --unit-test test_my_code --show-mutants > mutation_report.txt
``` 
That command writes a report about the mutation test realized by *mutmut* based in the code (*my_code*) and in the tests code (*test_my_code*) and keep the results in the *mutation_report.txt*. 

Since we have the possible mutation in the report, we need to extract them and, with them, make all the possible combinations of mutation tests that are possible for the given inputs. This is up to the command:
``` bash
python3 filtra_linhas.py mutation_report.txt mutation_report_filtered.txt
``` 

In the final, it only removes the auxiliary file by using the following command:
``` bash
rm mutation_report.txt -rf
``` 

---

### JavaScript directory

We're using *Jest* to write unit tests so you need to install it by running:
```bash
npm init -y
npm i --save-dev jest
```

You also have to add the testing package to the ```packages.json``` file:
```bash
"test": "jest"
```
Or to generate an HTML file:
```bash
"test": "jest --coverage"
```

Then to run unit tests you can use:
```bash
npm test
```

Because we use *Stryker* to generate mutations tests, it's necessary to have the *Stryker* plugin installed before running the code. If you don't have it installed yet, run this commands:
```bash
npm install --save-dev @stryker-mutator/core @stryker-mutator/jest-runner
npx stryker init
```

Then, we need to add configurations to use *Stryker*. In the ```stryker.config.json``` file add ```"json"``` to the reporters list.
~~~
"reporters": [
    "html",
    "clear-text",
    "progress",
    "json"
]
~~~
This specifies the file types in which you want to see the results.

In the same file add ```"mutate"``` field, according to the directory structure:
~~~
"mutate": [
    "*.js",
    "!*.test.js"
]
~~~
This indicates the name structure of the code and respective tests files, so that *Stryker* knows how to get to them.

Lastly, you can run *Stryker* by running:
```bash
npx stryker run
```

Since we have the possible mutations in the report, we need to extract them. This is up to the command:
```bash
node generate_mutants.js
```

---

### Gemini directory
Inside this directory, you have the files that we used to make the selection of the mutation tests. To do that, we used *Gemini*.

To run the program that select the tests, first you need to have installed the *SDK* for the *API Gemini*. If you don't have it installed, run the next command:
```bash
pip install -q -U google-generativeai
```

After that, you need to insert the context about your program in the *context.txt* file and the mutation tests in the *tests.txt* file, that are inside the *files* directory.

Now, you only need to run the *select_tests.py* file and a query will be sent to the Gemini to select the most important tests based on the context provided.

---

### Mockups in Figma
We used the Figma for doing our mockups. The results are in the next video:

The prototype is available in the link by clicking in
[here](https://www.figma.com/design/ewbsuGg3wS850OQ8ojRx6m/Demo-DS?node-id=0-1&node-type=canvas&t=uvDv5qWIqdJ7Jwzd-0).