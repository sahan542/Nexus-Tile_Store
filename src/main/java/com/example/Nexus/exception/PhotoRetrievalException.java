package com.example.Nexus.exception;

import java.sql.SQLException;

public class PhotoRetrievalException extends RuntimeException {
    public PhotoRetrievalException(String message, SQLException e) {
        super(message);
    }
}
