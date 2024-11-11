package com.example;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class MainTest {

    @Test
    public void testAdd() {
        Main main = new Main();
        int result = main.add(2, 3);
        assertEquals(5, result);
    }
}
