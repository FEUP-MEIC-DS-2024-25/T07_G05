package com.example;

public class Main {
    public int add(int a, int b) {
        return a + b;
    }

    public static void main(String[] args) {
        Main main = new Main();
        System.out.println("Resultado: " + main.add(5, 3));
    }
}