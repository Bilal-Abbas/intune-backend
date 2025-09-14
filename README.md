# Backend

A comprehensive backend system built with Node.js, Redis, BullMQ, and Supabase authentication. This service handles email delivery, push notifications, and real-time communication with retry logic, rate limiting, and comprehensive logging.

## Features

- 🔐 **Supabase Authentication** - Secure JWT-based authentication
- 📧 **Email Queuing** - Reliable email delivery with BullMQ and Redis
- 🔔 **Push Notifications** - Real-time in-app notifications with database persistence
- 🔄 **Retry Logic** - Automatic retry with exponential backoff
- 📊 **Queue Monitoring** - Real-time queue status and metrics
- 🛡️ **Security** - Rate limiting, CORS, and Helmet security headers
- 📝 **Logging** - Comprehensive logging with Winston
- 🚀 **Scalable** - Concurrent email processing with configurable workers
- 📱 **Real-time Updates** - Database triggers for instant notification delivery

## Tech Stack

- **Runtime**: Node.js 21+ with TypeScript
- **Framework**: Express.js
- **Queue**: BullMQ with Redis
- **Authentication**: Supabase Auth
- **Email Service**: AWS SES (Simple Email Service)
- **Database**: Supabase (PostgreSQL)
- **Logging**: Winston
- **Validation**: Joi
- **Security**: Helmet, CORS, Rate Limiting
- **Deployment**: Docker, Elastic Beanstalk, ECR

## Prerequisites

- Node.js 21+
- Docker and Docker Compose
- Supabase project
- AWS account with SES configured
- AWS account (for production deployment)

## Quick Start

### Local Development

1. **Clone and navigate to backend**
   ```bash
   cd backend
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with your configuration:
   ```env
   # Server Configuration
   PORT=3001
   NODE_ENV=development
   
   # Redis Configuration
   REDIS_HOST=localhost
   REDIS_PORT=6379
   REDIS_PASSWORD=
   REDIS_DB=0
   
   # Supabase Configuration
   SUPABASE_URL=your_supabase_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   
   # AWS SES Configuration
   AWS_SES_REGION=us-east-1
   AWS_ACCESS_KEY_ID=your_aws_access_key_id
   AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
   
   # Email Configuration
   FROM_EMAIL=noreply@yourdomain.com
   EMAIL_RETRY_ATTEMPTS=3
   EMAIL_RETRY_DELAY=5000
   
   # Rate Limiting
   RATE_LIMIT_WINDOW_MS=900000
   RATE_LIMIT_MAX_REQUESTS=100
   ```

3. **Start with Docker Compose (Recommended)**
   ```bash
   # Development environment
   docker-compose up --build
   
   # Or run in background
   docker-compose up -d --build
   ```

4. **Alternative: Local development**
   ```bash
   # Install dependencies
   npm install
   
   # Start Redis (if not using Docker)
   docker run -d -p 6379:6379 redis:7-alpine
   
   # Start development server
   npm run dev
   ```

## Docker Setup

### Development Environment
```bash
# Start all services (backend + Redis + Redis Commander)
docker-compose up

# Access services:
# - Backend API: http://localhost:3001
# - Redis Commander: http://localhost:8081
# - Redis: localhost:6379
```

### Production Testing
```bash
# Test with production ECR image locally
docker-compose -f docker-compose.prod.yml up
```

## API Endpoints

### Authentication
All endpoints require a valid Supabase JWT token in the Authorization header:
```
Authorization: Bearer <your-supabase-jwt-token>
```

### Push Notification Endpoints

#### Create Notification
```http
POST /api/notifications
Content-Type: application/json

{
  "userId": "user-uuid",
  "organizationId": "org-uuid",
  "context": "message_received",
  "referenceId": "reference-uuid",
  "message": "You have received a new message",
  "metadata": {
    "senderName": "John Doe",
    "threadId": "thread-uuid"
  }
}
```

#### Create Bulk Notifications
```http
POST /api/notifications/bulk
Content-Type: application/json

{
  "notifications": [
    {
      "userId": "user-uuid-1",
      "context": "message_received",
      "message": "You have received a new message"
    },
    {
      "userId": "user-uuid-2",
      "context": "proposal_received",
      "message": "You have received a new proposal"
    }
  ]
}
```

#### Get User Notifications
```http
GET /api/notifications/user/:userId?limit=50&offset=0
```

#### Get Unread Count
```http
GET /api/notifications/user/:userId/unread-count
```

#### Mark Notification as Read
```http
PUT /api/notifications/:notificationId/read
```

#### Mark All Notifications as Read
```http
PUT /api/notifications/user/:userId/read-all
```

### Email Queue Endpoints

#### Queue Single Email
```http
POST /api/email/queue
Content-Type: application/json

{
  "to": "recipient@example.com",
  "userId": "user-uuid",
  "organizationId": "org-uuid",
  "referenceId": "reference-uuid",
  "context": "message_received",
  "subject": "New Message",
  "html": "<h1>Hello World</h1>",
  "priority": 0,
  "delay": 0,
  "attempts": 3
}
```

#### Queue Template Email
```http
POST /api/email/queue/template
Content-Type: application/json

{
  "to": "recipient@example.com",
  "userId": "user-uuid",
  "organizationId": "org-uuid",
  "referenceId": "reference-uuid",
  "context": "site_matched_by_sponsor",
  "templateData": {
    "sponsorName": "Acme Pharmaceuticals",
    "studyTitle": "Phase III Clinical Trial",
    "siteContactName": "Dr. Sarah Johnson",
    "studyLink": "https://yourdomain.com/study/123"
  }
}
```

#### Queue Batch Emails
```http
POST /api/email/queue/batch
Content-Type: application/json

{
  "emails": [
    {
      "to": "recipient1@example.com",
      "userId": "user-uuid",
      "context": "message_received",
      "subject": "New Message",
      "html": "<h1>Hello World</h1>"
    }
  ]
}
```

#### Queue Batch Template Emails
```http
POST /api/email/queue/batch/template
Content-Type: application/json

{
  "emails": [
    {
      "to": "recipient1@example.com",
      "userId": "user-uuid",
      "organizationId": "org-uuid",
      "referenceId": "reference-uuid",
      "context": "site_matched_by_sponsor",
      "templateData": {
        "sponsorName": "Acme Pharmaceuticals",
        "studyTitle": "Phase III Clinical Trial",
        "siteContactName": "Dr. Sarah Johnson",
        "studyLink": "https://yourdomain.com/study/123"
      }
    }
  ]
}
```

#### Get Queue Status
```http
GET /api/email/queue/status
```

#### Health Check
```http
GET /api/email/health
```

## Notification Contexts

The system supports the following notification contexts for both email and push notifications:

### Core Communication
- `message_received` - New message notifications
- `proposal_received` - Proposal notifications
- `file_uploaded` - File upload notifications
- `signup_confirmation` - Signup confirmations

### Study Management
- `study_created` - Study creation notifications
- `study_published` - Study published notifications
- `site_created` - Site creation notifications

### Site-Sponsor Interaction Lifecycle
- `invitation_sent_by_sponsor` - When sponsor invites site to submit proposal
- `site_matched_by_sponsor` - When sponsor moves site to matched status
- `feasibility_confirmed_by_sponsor` - When sponsor confirms site feasibility
- `site_shortlisted_by_sponsor` - When sponsor moves site to shortlisted status
- `site_selected_by_sponsor` - When sponsor officially selects site for participation
- `site_recruited_by_sponsor` - Site recruitment notifications

### Status Changes
- `site_archived_by_site` - When site moves study to archive (site-initiated)
- `site_archived_by_sponsor` - When sponsor moves site to archive (sponsor-initiated)
- `proposal_status_updated` - Proposal status change notifications

### Direct Messaging
- `sponsor_message_to_site` - When sponsor sends message to site
- `site_message_to_sponsor` - When site sends message to sponsor

### System Notifications
- `system_announcement` - System-wide announcements
- `document_uploaded` - Document upload notifications
- `proposal_accepted` - Proposal acceptance notifications
- `proposal_rejected` - Proposal rejection notifications

## Email Template System

The backend includes a comprehensive template system with the following features:

### Template Structure
Each email template includes:
- **HTML Template**: Responsive, branded email design
- **Subject Line**: Dynamic subject generation
- **TypeScript Interface**: Type-safe template data
- **Conditional Rendering**: Optional content based on data

### Available Templates

#### Status Change Templates
1. **Site Matched** (`site_matched_by_sponsor`)
   - Notifies sites when moved to matched status
   - Includes sponsor message and next steps

2. **Feasibility Confirmed** (`feasibility_confirmed_by_sponsor`)
   - Confirms site feasibility assessment
   - Provides next steps for site activation

3. **Site Shortlisted** (`site_shortlisted_by_sponsor`)
   - Announces shortlisting for final selection
   - Encourages proposal submission

4. **Site Selected** (`site_selected_by_sponsor`)
   - Official selection notification
   - Details about contract and activation steps

5. **Site Archived** (`site_archived_by_site`, `site_archived_by_sponsor`)
   - Notifies about study archiving
   - Explains reasons and next steps

#### Communication Templates
6. **Invitation Sent** (`invitation_sent_by_sponsor`)
   - Invites sites to submit proposals
   - Includes sponsor message and study details

7. **Sponsor Message to Site** (`sponsor_message_to_site`)
   - Direct communication from sponsor
   - Includes message content and document notifications

8. **Site Message to Sponsor** (`site_message_to_sponsor`)
   - Direct communication from site
   - Includes message content and status information

### Template Testing

All templates can be tested using the email queue endpoints:

```bash
# Test single template email
curl -X POST http://localhost:3001/api/email/queue/template \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "to": "recipient@example.com",
    "userId": "user-uuid",
    "organizationId": "org-uuid",
    "referenceId": "reference-uuid",
    "context": "site_matched_by_sponsor",
    "templateData": {
      "sponsorName": "Acme Pharmaceuticals",
      "studyTitle": "Phase III Clinical Trial",
      "siteContactName": "Dr. Sarah Johnson",
      "studyLink": "https://yourdomain.com/study/123"
    }
  }'
```

### Template Data Structure

Each template expects specific data fields:

```typescript
// Example: Site Matched Template
interface SiteMatchedTemplateData {
  sponsorName: string;
  studyTitle: string;
  siteContactName: string;
  studyLink: string;
}

// Example: Sponsor Message Template
interface SponsorMessageToSiteTemplateData {
  sponsorName: string;
  studyTitle: string;
  siteContactName: string;
  sponsorContactName: string;
  sponsorMessage: string;
  currentSiteStatus: string;
  studyLink: string;
  hasDocument: boolean;
}
```

## Push Notification System

The backend includes a comprehensive push notification system that integrates with the frontend for real-time updates:

### Notification Features
- **Real-time Delivery** - Notifications are stored in the database and trigger real-time updates
- **Bulk Operations** - Create multiple notifications efficiently
- **Read Status Tracking** - Track read/unread status for each notification
- **Context-based Filtering** - Filter notifications by context and metadata
- **Pagination Support** - Efficient loading of notification history

### Client Integration

The notification system is designed to work with any client that can:
- Make HTTP requests to the API endpoints
- Subscribe to Supabase real-time changes
- Handle JWT authentication

#### Real-time Updates
Clients can subscribe to real-time notifications using Supabase's real-time features:
- Subscribe to `notifications` table changes
- Filter by `user_id` for user-specific notifications
- Handle INSERT events for new notifications

#### API Usage
All endpoints require proper authentication and return structured JSON responses.

## Monitoring

### Queue Status
Monitor the queue status through the API endpoint or Redis CLI:

```bash
# Check queue status via API
curl -H "Authorization: Bearer <token>" http://localhost:3001/api/email/queue/status

# Check Redis directly
redis-cli
> KEYS email-queue:*
> LLEN email-queue:wait
> LLEN email-queue:active
```

### Redis Commander
Access the Redis Commander web interface at `http://localhost:8081` to monitor Redis queues and data.

### Logs
Logs are stored in the `logs/` directory:
- `logs/error.log` - Error logs
- `logs/combined.log` - All logs

## Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 3001 |
| `NODE_ENV` | Environment | development |
| `REDIS_HOST` | Redis host | localhost |
| `REDIS_PORT` | Redis port | 6379 |
| `REDIS_PASSWORD` | Redis password | - |
| `REDIS_DB` | Redis database | 0 |
| `SUPABASE_URL` | Supabase URL | - |
| `SUPABASE_ANON_KEY` | Supabase anon key | - |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service key | - |
| `AWS_REGION` | AWS Region | us-east-1 |
| `AWS_ACCESS_KEY_ID` | AWS Access Key ID | - |
| `AWS_SECRET_ACCESS_KEY` | AWS Secret Access Key | - |
| `FROM_EMAIL` | Default from email | noreply@yourdomain.com |
| `EMAIL_RETRY_ATTEMPTS` | Max retry attempts | 3 |
| `EMAIL_RETRY_DELAY` | Retry delay (ms) | 5000 |
| `RATE_LIMIT_WINDOW_MS` | Rate limit window | 900000 |
| `RATE_LIMIT_MAX_REQUESTS` | Max requests per window | 100 |

### Queue Configuration

The email worker processes emails with the following settings:
- **Concurrency**: 5 emails processed simultaneously
- **Retry Strategy**: Exponential backoff
- **Job Retention**: 100 completed jobs, 50 failed jobs

## Development

### Scripts

```bash
# Development with hot reload
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run tests
npm test

# Docker development
docker compose up --build
```

### Project Structure

```
src/
├── config/          # Configuration files
│   ├── database.ts  # Supabase configuration
│   └── redis.ts     # Redis configuration
├── middleware/      # Express middleware
│   └── auth.ts      # Authentication middleware
├── routes/          # API routes
│   ├── email.ts     # Email queue routes
│   └── notifications.ts # Push notification routes
├── services/        # Business logic
│   ├── emailQueue.ts # BullMQ queue service
│   ├── emailService.ts # Email sending service
│   ├── notificationService.ts # Push notification service
│   ├── sesEmailService.ts # AWS SES email service
│   └── templateService.ts # Email template rendering service
├── templates/       # Email templates
│   ├── message_received.ts # Message received template
│   ├── study_published.ts # Study published template
│   ├── site_created.ts # Site created template
│   ├── proposal_received.ts # Proposal received template
│   ├── invitation_sent.ts # Invitation sent template
│   ├── site_archived.ts # Site archived template
│   ├── site_matched.ts # Site matched template
│   ├── feasibility_confirmed.ts # Feasibility confirmed template
│   ├── site_shortlisted.ts # Site shortlisted template
│   ├── site_selected.ts # Site selected template
│   ├── site_archived_by_sponsor.ts # Site archived by sponsor template
│   ├── sponsor_message_to_site.ts # Sponsor message to site template
│   ├── site_message_to_sponsor.ts # Site message to sponsor template
│   ├── site_welcome.ts # Site welcome template
│   └── sponsor_welcome.ts # Sponsor welcome template
├── types/           # TypeScript types
│   └── index.ts     # Type definitions
├── utils/           # Utilities
│   ├── logger.ts    # Winston logger
│   └── notificationHelpers.ts # Notification helper functions
└── index.ts         # Main application file
```

## Deployment

### Docker

The project includes a complete Docker setup with:

```yaml
# docker-compose.yml includes:
- email-queue-backend (Node.js app)
- redis (Redis server)
- redis-commander (Redis monitoring UI)
```

To deploy:
```bash
# Build and start all services
docker compose up --build

# Or run in background
docker compose up -d --build
```

### Environment Setup

1. Set up Redis (managed service or self-hosted)
2. Configure Supabase project
3. Set up AWS SES account
4. Deploy the application
5. Configure client applications to use the API endpoints

## Troubleshooting

### Common Issues

1. **Redis Connection Failed**
   - Check Redis server is running
   - Verify Redis connection settings in `.env`
   - For Docker: ensure redis service is started

2. **Authentication Errors**
   - Ensure Supabase JWT token is valid
   - Check Supabase configuration
   - Verify token is included in Authorization header

3. **Email Delivery Failed**
   - Verify AWS SES configuration
   - Check email content and recipient addresses
   - Review email service logs

4. **Queue Not Processing**
   - Check worker is running
   - Verify Redis connection
   - Check logs for errors
   - Monitor queue status via API

5. **Notification Delivery Issues**
   - Check Supabase database connection
   - Verify notification table exists and has proper permissions
   - Ensure clients are subscribed to real-time changes
   - Check notification service logs

6. **TypeScript Compilation Errors**
   - Ensure all functions have proper return statements
   - Check for missing imports (e.g., crypto module)
   - Run `npm run build` to verify compilation

### Logs

Check the application logs for detailed error information:

```bash
# View real-time logs
tail -f logs/combined.log

# View error logs
tail -f logs/error.log

# Docker logs
docker compose logs -f email-queue-backend
```

## License

MIT License - see LICENSE file for details. 