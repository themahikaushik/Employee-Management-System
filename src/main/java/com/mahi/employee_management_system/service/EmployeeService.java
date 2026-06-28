package com.mahi.employee_management_system.service;

import java.util.List;
import com.mahi.employee_management_system.entity.Employee;

public interface EmployeeService {

    Employee saveEmployee(Employee employee);

    List<Employee> getAllEmployees();
    void deleteEmployee(Long id);
}