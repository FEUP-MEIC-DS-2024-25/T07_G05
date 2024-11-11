# T07_G05
AI assistant for mutation tests selection

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

### Mockups in Figma
We used the Figma for doing our mockups. The results are in the next video:

The prototype is available in the link by clicking in
[here](https://www.figma.com/design/ewbsuGg3wS850OQ8ojRx6m/Demo-DS?node-id=0-1&node-type=canvas&t=uvDv5qWIqdJ7Jwzd-0).