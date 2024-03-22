# Lex using python

Lex it's a software that generates lexicons analyzers. The Lex read on input flow especific an analyzer mapping regular expressions.

## File structure

The files are divided into three parts separeted by lines that contains only two percentage symbols

```
definições
%%
regras
%%
subrotinas
```

## exemplo of a lex file
```
/*** seção de definição ***/

%{
# include <stdio.h>
%}

%%
    /*** seção de regras ***/

    /* [0-9]+ casa uma cadeia de um ou mais dígitos */
[0-9]+  {
            /* yytext é a cadeia contendo o texto casado. */
            printf("Inteiro: %s\n", yytext);
        }

.       {   /* Ignora outros caracteres. */   }

%%
/*** seção de código C ***/

int main(void)
{
    /* executa o analisador léxico. */
    yylex();
    return 0;
}

```

## PLY

The ply its a implemetaion of Lex and yacc for python 

