CREATE TABLE Banco (
    id_banco INT PRIMARY KEY,
    nombre VARCHAR(100),
    contacto VARCHAR(100),
    sucursales TEXT,
    links TEXT,
    correos TEXT
);

CREATE TABLE Producto (
    id_producto INT PRIMARY KEY,
    nombre VARCHAR(100),
    categoria VARCHAR(50),
    tasaInteres DECIMAL(5, 2),
    beneficios TEXT,
    requisitos TEXT,
    cashback DECIMAL(5, 2),
    imagen VARCHAR(255),
    id_banco INT,
    FOREIGN KEY (id_banco) REFERENCES Banco(id_banco)
);

CREATE TABLE Fraude (
    id_fraude INT PRIMARY KEY,
    tipo_fraude VARCHAR(50),
    descripcion TEXT,
    id_banco INT,
    FOREIGN KEY (id_banco) REFERENCES Banco(id_banco)
);
