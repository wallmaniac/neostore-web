
# Copilot Instructions








### Theme Support
- Use CSS variables defined in app.css for colors, never hard-coded RGB or HEX values
- Support both light and dark themes via the [data-theme="dark"] selector
- Test all components in both light and dark themes before committing
- Use rgba(var(--primary-color-rgb), opacity) for transparent colors
- Apply color transitions with `transition: color 0.3s ease, background-color 0.3s ease`
- **Bootstrap Override Classes**: When using Bootstrap alert/button classes, override with CSS variables for dark theme support (e.g., .alert-warning, .btn-secondary)
- **Modal Close Buttons**: Ensure .btn-close works in dark theme by applying appropriate filter properties

### Icons & UI Elements
- Use Bootstrap Icons (bi bi-*) with consistent sizing and spacing
- Add icon animations on hover using transform properties
- Format icon containers with proper alignment: `d-flex align-items-center gap-2`
- Include appropriate ARIA attributes on interactive icons

### Card & Component Design
- Apply consistent border-radius using var(--border-radius) variables
- Use var(--card-shadow) for box-shadow on cards and raised elements
- Apply subtle hover effects: transform, box-shadow, or background-color changes
- Create clean card headers with the primary gradient background
- Use primary-gradient for accent elements: `background: var(--primary-gradient)`

### Responsive Design
- Use responsive grids with Bootstrap's column system or CSS Grid
- Implement dedicated media queries for mobile adjustments at standard breakpoints
- Test on multiple viewport sizes: desktop, tablet, and mobile
- Avoid fixed pixel values for responsive elements, prefer rem/em units
- Adapt to smaller screens by adjusting spacing, font size, and layout

### Best Practices
- Use rem/em units for font sizes and spacing for better accessibility
- Document any magic numbers or non-obvious style choices in comments
- Maintain semantic HTML structure with proper heading hierarchy
- Include responsive adjustments at the bottom of CSS files
- Group related CSS rules together with clear comments

### Table Styling Patterns
For consistent table design across admin interfaces, follow these established patterns:

**HTML Structure:**
```html
<div class="table-responsive">
    <table class="table table-hover align-middle admin-[component]-table">
        <thead>
            <tr>
                <th scope="col">Column Name</th>
                <th scope="col" class="d-none d-md-table-cell">Hidden on Mobile</th>
                <th scope="col" class="text-center">Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>
                    <div class="item-name">Primary Content</div>
                </td>
                <td class="d-none d-md-table-cell">
                    <span class="item-date">
                        <i class="bi bi-calendar me-1"></i>
                        Secondary Content
                    </span>
                </td>
                <td class="text-center">
                    <div class="action-buttons">
                        <button class="btn btn-sm btn-outline-primary" title="Action">
                            <i class="bi bi-pencil"></i>
                        </button>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</div>
```

**CSS Class Structure:**
- `.admin-[component]-table` - Main table class with custom styling
- `.table-responsive` - Bootstrap wrapper for horizontal scrolling
- `.d-none .d-md-table-cell` - Responsive column hiding
- `.action-buttons` - Container for action button groups
- `.status-badge` - Styled status indicators with theme support
- `.item-date` - Date/time display with icons
- `.item-name` - Primary content styling

**Key CSS Properties:**
```css
.admin-[component]-table {
    width: 100%;
    margin-bottom: 0;
    background: var(--card-bg);
}

.admin-[component]-table th {
    background: rgba(var(--bg-secondary-rgb), 0.8);
    color: var(--text-primary);
    font-weight: 600;
    text-transform: uppercase;
    font-size: 0.875rem;
    letter-spacing: 0.5px;
    border-bottom: 2px solid var(--border-color);
}

.admin-[component]-table tbody tr:hover td {
    background: linear-gradient(135deg, rgba(var(--primary-color-rgb), 0.05) 0%, rgba(var(--primary-color-rgb), 0.1) 100%);
}
```

**Status Badge Pattern:**
```css
.status-badge {
    display: inline-flex;
    align-items: center;
    padding: 0.25rem 0.75rem;
    border-radius: var(--border-radius-pill);
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    gap: 0.25rem;
    transition: all 0.3s ease;
}
```

**Dark Theme Requirements:**
- Use `[data-theme="dark"]` selector for dark mode overrides
- Apply enhanced contrast for table hover states
- Ensure status badges maintain readability in both themes
- Use CSS variables exclusively, never hard-coded colors

**Responsive Breakpoints:**
- `@media (max-width: 991.98px)` - Tablet adjustments
- `@media (max-width: 767.98px)` - Mobile layout changes
- `@media (max-width: 575.98px)` - Small mobile optimizations

See AdminReports.razor and AdminApiKeyManagement.razor for reference implementations.

## Code Style
- Prefer async/await over direct Task handling
- When checking for nul in C# prefer to use `is null` or `is not null`
- Use nullable reference types
- Use var over explicit type declarations 
- Always implement IDisposable when dealing with event handlers or subscriptions
- Prefer using async/await for asynchronous operations
- Use latest C# features (e.g., records, pattern matching)
- Use consistent naming conventions (PascalCase for public members, camelCase for private members)
- Use meaningful names for variables, methods, and classes
- Use dependency injection for services and components
- Use interfaces for service contracts and put them in a unique file
- Use file scoped namespaces in C# and are PascalCased
- Always add namespace declarations to Blazor components matching their folder structure
- Organize using directives:
  - Put System namespaces first
  - Put Microsoft namespaces second
  - Put application namespaces last
  - Remove unused using directives
  - Sort using directives alphabetically within each group

## Component Structure
- Keep components small and focused
- Extract reusable logic into services
- Use cascading parameters sparingly
- Prefer component parameters over cascading values

## Error Handling
- Use try-catch blocks in event handlers
- Implement proper error boundaries
- Display user-friendly error messages
- Log errors appropriately
- **Usage Limit Errors**: Check for JSON error responses with "USAGE_LIMIT_EXCEEDED" ErrorCode and display UsageLimitDialog instead of raw error messages

## Performance
- Implement proper component lifecycle methods
- Use @key directive when rendering lists
- Avoid unnecessary renders
- Use virtualization for large lists

## Testing
- Write unit tests for complex component logic only if i ask for tests
- Test error scenarios
- Mock external dependencies
- Use MSTest for component testing
- Create tests in the feedbackflow.tests project

## Documentation
- Document public APIs
- Include usage examples in comments
- Document any non-obvious behavior
- Keep documentation up to date

## Security
- Always validate user input

## Accessibility
- Use semantic HTML
- Include ARIA attributes where necessary
- Ensure keyboard navigation works

## File Organization
- Keep related files together
- Use meaningful file names
- Follow consistent folder structure
- Group components by feature when possible


