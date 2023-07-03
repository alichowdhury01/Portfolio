import java.util.*;

class Service {
    String name;
    int duration;
    int preferredStartTime;
    int preferredEndTime;

    public Service(String name, int duration, int preferredStartTime, int preferredEndTime) {
        this.name = name;
        this.duration = duration;
        this.preferredStartTime = preferredStartTime;
        this.preferredEndTime = preferredEndTime;
    }
}

class Employee {
    int id;
    int startHour;
    int startMinute;
    int endHour;
    int endMinute;

    public Employee(int id, int startHour, int startMinute, int endHour, int endMinute) {
        this.id = id;
        this.startHour = startHour;
        this.startMinute = startMinute;
        this.endHour = endHour;
        this.endMinute = endMinute;
    }

    public int getStartTimeInMinutes() {
        return startHour * 60 + startMinute;
    }

    public int getEndTimeInMinutes() {
        return endHour * 60 + endMinute;
    }
}

class Apartment {
    int id;
    List<Service> services;

    public Apartment(int id) {
        this.id = id;
        services = new ArrayList<>();
    }

    public void addService(Service service) {
        services.add(service);
    }
}

public class ServiceScheduler {
    public static void main(String[] args) {
        // Create employees
        Employee[] employees = new Employee[8];
        employees[0] = new Employee(1, 7, 15, 15, 0);
        employees[1] = new Employee(2, 7, 45, 15, 30);
        employees[2] = new Employee(3, 8, 0, 15, 45);
        employees[3] = new Employee(4, 15, 45, 23, 15);
        employees[4] = new Employee(5, 16, 15, 0, 0);
        employees[5] = new Employee(6, 16, 15, 0, 0);
        employees[6] = new Employee(7, 22, 0, 8, 0);
        employees[7] = new Employee(8, 0, 0, 10, 0);

        // Create apartments and their services
        Apartment[] apartments = new Apartment[6];
        for (int i = 0; i < 6; i++) {
            apartments[i] = new Apartment(i + 1);
        }

        // Add services for each apartment
apartments[0].addService(new Service("Snack", 15, 960, 990));
apartments[0].addService(new Service("Reading", 30, 840, 870));
apartments[1].addService(new Service("Exercise", 45, 780, 825));
apartments[1].addService(new Service("Dinner", 45, 1080, 1125));
apartments[2].addService(new Service("Breakfast", 30, 390, 420));
apartments[2].addService(new Service("Cleaning", 60, 870, 930));
apartments[3].addService(new Service("Shower", 20, 660, 680));
apartments[3].addService(new Service("Snack", 15, 990, 1005));
apartments[4].addService(new Service("Bedtime", 15, 1440, 1410));
apartments[4].addService(new Service("Breakfast", 30, 270, 300));
apartments[5].addService(new Service("Lunch", 45, 840, 885));
apartments[5].addService(new Service("Dinner", 45, 1050, 1095));

apartments[0].addService(new Service("Snack", 15, 960, 990));
apartments[0].addService(new Service("Reading", 30, 840, 870));
apartments[1].addService(new Service("Exercise", 45, 780, 825));
apartments[1].addService(new Service("Dinner", 45, 1080, 1125));
apartments[2].addService(new Service("Breakfast", 30, 390, 420));
apartments[2].addService(new Service("Cleaning", 60, 870, 930));
apartments[3].addService(new Service("Shower", 20, 660, 680));
apartments[3].addService(new Service("Snack", 15, 990, 1005));
apartments[4].addService(new Service("Bedtime", 15, 1440, 1410));
apartments[4].addService(new Service("Breakfast", 30, 270, 300));
apartments[5].addService(new Service("Lunch", 45, 840, 885));
apartments[5].addService(new Service("Dinner", 45, 1050, 1095));

apartments[0].addService(new Service("Snack", 15, 960, 990));
apartments[0].addService(new Service("Reading", 30, 840, 870));
apartments[1].addService(new Service("Exercise", 45, 780, 825));
apartments[1].addService(new Service("Dinner", 45, 1080, 1125));
apartments[2].addService(new Service("Breakfast", 30, 390, 420));
apartments[2].addService(new Service("Cleaning", 60, 870, 930));
apartments[3].addService(new Service("Shower", 20, 660, 680));
apartments[3].addService(new Service("Snack", 15, 990, 1005));
apartments[4].addService(new Service("Bedtime", 15, 1440, 1410));
apartments[4].addService(new Service("Breakfast", 30, 270, 300));
apartments[5].addService(new Service("Lunch", 45, 840, 885));
apartments[5].addService(new Service("Dinner", 45, 1050, 1095));
       // Add services for other apartments similarly

        // Schedule services for tenants
        for (Apartment apartment : apartments) {
            System.out.println("Apartment " + apartment.id + ":");
            int currentMinute = 0;
            for (Service service : apartment.services) {
                int duration = service.duration;
                int preferredStartTime = service.preferredStartTime;
                int preferredEndTime = service.preferredEndTime;

                Employee assignedEmployee = null;
                int minStartTimeDiff = Integer.MAX_VALUE;

                for (Employee employee : employees) {
                    int employeeStartTime = employee.getStartTimeInMinutes();
                    int employeeEndTime = employee.getEndTimeInMinutes();

                    if (employeeEndTime - employeeStartTime < duration) {
                        continue; // Skip if employee doesn't have enough time
                    }

                    int startTimeDiff = Math.abs(employeeStartTime - preferredStartTime);
                    if (startTimeDiff <= minStartTimeDiff &&
                            employeeStartTime >= preferredStartTime &&
                            employeeEndTime >= preferredEndTime) {
                        assignedEmployee = employee;
                        minStartTimeDiff = startTimeDiff;
                    }
                }

                if (assignedEmployee != null) {
                    int startHour = currentMinute / 60;
                    int startMinute = currentMinute % 60;
                    int endHour = (currentMinute + duration) / 60;
                    int endMinute = (currentMinute + duration) % 60;

                    System.out.println("- " + service.name +
                            " (" + duration + " minutes): " +
                            "Start: " + String.format("%02d:%02d", startHour, startMinute) +
                            ", End: " + String.format("%02d:%02d", endHour, endMinute) +
                            ", Employee: " + assignedEmployee.id);

                    currentMinute += duration;
                } else {
                    System.out.println("- " + service.name + " - No available employee!");
                }
            }
            System.out.println();
        }
    }
}
