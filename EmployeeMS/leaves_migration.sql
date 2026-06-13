DROP TABLE IF EXISTS leaves;
CREATE TABLE leaves (
    id INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Unique leave application ID',
    employee_id INT NOT NULL COMMENT 'FK to employee table',
    leave_type ENUM('sick', 'annual', 'unpaid', 'maternity', 'personal') NOT NULL COMMENT 'Type of leave',
    start_date DATE NOT NULL COMMENT 'First day of leave',
    end_date DATE NOT NULL COMMENT 'Last day of leave',
    reason TEXT COMMENT 'Employee provided reason for leave',
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending' COMMENT 'Current status of application',
    admin_comment TEXT COMMENT 'Comments from admin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'When application was submitted',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'When status was last updated',
    
    -- Foreign Key referencing the singular 'employee' table
    CONSTRAINT fk_leaves_employee FOREIGN KEY (employee_id) REFERENCES employee(id) ON DELETE CASCADE,
    
    -- Ensure dates are logical
    CONSTRAINT check_dates CHECK (start_date <= end_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Stores all leave applications from employees';
