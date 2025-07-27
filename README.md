# Backend

A robust email queuing system built with Node.js, Redis, BullMQ, and Supabase authentication. This backend service handles email delivery with retry logic, rate limiting, and comprehensive logging.

## Features

- 🔐 **Supabase Authentication** - Secure JWT-based authentication
- 📧 **Email Queuing** - Reliable email delivery with BullMQ and Redis
- 🔄 **Retry Logic** - Automatic retry with exponential backoff
- 📊 **Queue Monitoring** - Real-time queue status and metrics
- 🛡️ **Security** - Rate limiting, CORS, and Helmet security headers
- 📝 **Logging** - Comprehensive logging with Winston
- 🚀 **Scalable** - Concurrent email processing with configurable workers

## Tech Stack

- **Runtime**: Node.js 18+ with TypeScript
- **Framework**: Express.js
- **Queue**: BullMQ with Redis
- **Authentication**: Supabase Auth
- **Email Service**: Resend
- **Database**: Supabase (PostgreSQL)
- **Logging**: Winston
- **Validation**: Joi
- **Security**: Helmet, CORS, Rate Limiting

## Prerequisites

- Node.js 18+ 
- Redis server
- Supabase project
- Resend API key

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
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
   
   # Resend Configuration
   RESEND_API_KEY=your_resend_api_key
   
   # Security
   JWT_SECRET=your_jwt_secret
   RATE_LIMIT_WINDOW_MS=900000
   RATE_LIMIT_MAX_REQUESTS=100
   
   # Email Configuration
   FROM_EMAIL=Intune <noreply@app.intune.bio>
   EMAIL_RETRY_ATTEMPTS=3
   EMAIL_RETRY_DELAY=5000
   ```

4. **Start Redis server**
   ```bash
   # Using Docker (Recommended)
   docker run -d -p 6379:6379 redis:7-alpine
   
   # Or using Docker Compose (includes Redis Commander)
   docker compose up redis redis-commander
   
   # Or install Redis locally
   # Follow Redis installation guide for your OS
   ```

5. **Build and run**
   ```bash
   # Development
   npm run dev
   
   # Production
   npm run build
   npm start
   
   # Using Docker (Full stack)
   docker compose up --build
   ```

## API Endpoints

### Authentication
All endpoints require a valid Supabase JWT token in the Authorization header:
```
Authorization: Bearer <your-supabase-jwt-token>
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

#### Get Queue Status
```http
GET /api/email/queue/status
```

#### Health Check
```http
GET /api/email/health
```

## Email Contexts

The system supports the following email contexts:

- `message_received` - New message notifications
- `proposal_received` - Proposal notifications
- `site_recruited` - Site recruitment notifications
- `invitation_sent` - Invitation notifications
- `file_uploaded` - File upload notifications
- `signup_confirmation` - Signup confirmations
- `study_created` - Study creation notifications
- `facility_created` - Facility creation notifications
- `proposal_status_updated` - Proposal status change notifications

## Integration with Frontend

Update your frontend email sending function to use the queue backend:

```typescript
// Old implementation
export async function sendBatchEmailNotificationClient(emails: EmailJob[]) {
  const res = await fetch("/api/notifications/email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ emails }),
  });
  return res.json();
}

// New implementation with queue backend
export async function sendBatchEmailNotificationClient(emails: EmailJob[]) {
  // Get the user's JWT token from Supabase
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session?.access_token) {
    throw new Error('No authentication token available');
  }

  const res = await fetch("http://localhost:3001/api/email/queue/batch", {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${session.access_token}`
    },
    body: JSON.stringify({ emails }),
  });
  
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to queue emails");
  }
  
  return res.json();
}
```

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
| `RESEND_API_KEY` | Resend API key | - |
| `FROM_EMAIL` | Default from email | Intune <noreply@app.intune.bio> |
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
│   └── email.ts     # Email queue routes
├── services/        # Business logic
│   ├── emailQueue.ts # BullMQ queue service
│   └── emailService.ts # Email sending service
├── types/           # TypeScript types
│   └── index.ts     # Type definitions
├── utils/           # Utilities
│   └── logger.ts    # Winston logger
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
3. Set up Resend account
4. Deploy the application
5. Update frontend to use the new queue backend

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
   - Verify Resend API key
   - Check email content and recipient addresses
   - Review email service logs

4. **Queue Not Processing**
   - Check worker is running
   - Verify Redis connection
   - Check logs for errors
   - Monitor queue status via API

5. **TypeScript Compilation Errors**
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