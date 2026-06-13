CREATE TABLE IF NOT EXISTS leave_balance (
    id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT NOT NULL,
    leave_type ENUM('sick', 'annual', 'unpaid', 'maternity', 'personal') NOT NULL,
    total_days INT DEFAULT 0,
    used_days INT DEFAULT 0,
    remaining_days INT DEFAULT 0,
    year INT DEFAULT YEAR(NOW()),
    
    -- Foreign Key matching your singular employee table
    CONSTRAINT fk_balance_employee FOREIGN KEY (employee_id) REFERENCES employee(id) ON DELETE CASCADE,
    
    -- Unique constraint to prevent duplicate types for the same employee in the same year
    CONSTRAINT unique_employee_type_year UNIQUE (employee_id, leave_type, year)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

