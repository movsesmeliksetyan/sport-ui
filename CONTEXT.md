# Project Context: Real-Time Web Scraper with Next.js & NestJS Best Practices

## Overview
This project is a real-time web scraper application that retrieves data from a target website each time a user accesses the app. The scraped data is then displayed on a pixel-perfect, mobile-first UI built with Material UI. While the project is built with Next.js, the backend architecture and code organization will adhere to NestJS best practices, ensuring a modular, scalable, and maintainable codebase.

## Technology Stack
- **Frontend:** 
  - **Framework:** Next.js
  - **UI Library:** Material UI
  - **Design Approach:** Mobile-first and pixel-perfect design

- **Backend (Scraping & API):**
  - **Platform:** Node.js (integrated within Next.js API routes)
  - **Architecture:** Follows NestJS best practices (modular structure, dependency injection, etc.)
  - **Libraries:** Cheerio or Puppeteer for web scraping

## Architectural Guidelines & Best Practices

### Modular Structure
- **Separation of Concerns:**  
  - Create distinct modules for different functionalities (e.g., scraping, data parsing, API endpoints).
  - Organize code into clear layers: controllers (handling API routes), services (business logic and scraping operations), and modules (grouping related functionality).

### Dependency Injection
- **Service Management:**  
  - Emulate NestJS’s dependency injection pattern to decouple components.  
  - Inject services (e.g., a scraping service) into controllers to promote testability and reusability.

### Configuration & Environment Management
- Use environment variables for sensitive data and configurable settings (e.g., target website URL, scraping intervals).
- Centralize configuration management in a dedicated module or configuration file.

### Error Handling & Logging
- Implement comprehensive error handling in both the scraping service and API routes.
- Integrate logging (using libraries like Winston or Pino) to monitor application behavior and capture runtime errors.

### Performance & Scalability
- **Caching:**  
  - Consider caching frequent requests to reduce load times and avoid overloading the target website.
- **Rate Limiting:**  
  - Implement rate-limiting measures to prevent abuse and to respect the target website’s request policies.
- **Optimized Scraping:**  
  - Use efficient parsing libraries (Cheerio for static pages, Puppeteer for dynamic content) and optimize the scraping logic for quick responses.

## Implementation Details

### Backend (Scraping Service & API)
1. **Scraping Module:**
   - **scraper.module.js/ts:** Group related components (controller, service).
   - **scraper.service.js/ts:** Handle all scraping logic, including HTTP requests, HTML parsing, and data extraction.
   - **scraper.controller.js/ts:** Expose API endpoints to trigger the scraper and return data.
  
2. **API Route Integration:**
   - Create Next.js API routes that utilize the scraping module.
   - Ensure each API call triggers a fresh scrape (or retrieves from cache as configured) to deliver real-time data.

### Frontend (UI)
1. **Design & Layout:**
   - Use Material UI components to construct a modern, responsive interface.
   - Follow a mobile-first design philosophy to ensure a pixel-perfect UI across all devices.
   - Create reusable UI components (e.g., cards, lists, dialogs) to display scraped data.

2. **Data Fetching:**
   - Utilize Next.js data fetching methods (e.g., `getServerSideProps` or API route fetch calls) to retrieve the scraped data on page load.
   - Ensure error states and loading indicators are clearly communicated in the UI.

### Testing & Deployment
- **Testing:**
  - Write unit tests for both backend services (scraping logic, controllers) and frontend components.
  - Implement integration tests to ensure end-to-end functionality.
  
- **Deployment:**
  - Set up a CI/CD pipeline for automated testing and deployment.
  - Optimize serverless function settings (if using them) to accommodate scraping performance.

## Additional Considerations
- **Legal & Ethical Compliance:**  
  - Ensure that the target website permits scraping by reviewing its terms of service.
  - Implement respectful scraping practices (e.g., proper delays, headers, and error handling).
  
- **Documentation & Maintenance:**
  - Maintain clear documentation for the project setup, architecture, and contribution guidelines.
  - Document API endpoints and provide examples for both developers and future maintainers.

## Conclusion
This context sets the stage for a robust, real-time web scraping application built with Next.js and inspired by NestJS best practices. The focus on Material UI guarantees a pixel-perfect, mobile-first design, ensuring a seamless user experience while the backend remains modular, scalable, and maintainable.
