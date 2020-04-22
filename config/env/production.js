'use strict';

var databaseServiceName = (process.env.DATABASE_SERVICE_NAME || 'mongodb').toUpperCase().replace(/-/g, '_');
var replicaSetString = process.env.MONGODB_REPLICA_NAME ? `?replicaSet=${process.env.MONGODB_REPLICA_NAME}` : '';

module.exports = {
  app: {
    title: 'GCDevExchange | CarrefourProgGC',
    description: 'Making it easier for government and developers to work together | Aider le gouvernement et les programmeurs à travailler ensemble',
    keywords: 'developer, développeur, government, gouvernement, agile, digital service, service numérique',
    domain: 'https://gcdevexchange-carrefourproggc.org'
  },
  port: process.env.PORT || 3000,
  host: process.env.HOST || '0.0.0.0',
  sessionCookie: {
    // session expiration is set by default to 24 hours
    maxAge: 24 * (60 * 60 * 1000),
    // httpOnly flag makes sure the cookie is only accessed
    // through the HTTP protocol and not JS/browser
    httpOnly: true,
    // secure cookie should be turned to true to provide additional
    // layer of security so that the cookie is set only when working
    // in HTTPS mode.
    secure: true
  },
  sessionSecret: process.env.SESSION_SECRET || 'gcdevexchange-secret',
  sessionKey: 'sessionId',
  sessionCollection: 'sessions',
  // Lusca config
  csrf: {
    csrf: false,
    csp: false,
    xframe: 'SAMEORIGIN',
    p3p: 'ABCDEF',
    xssProtection: true
  },
  logo: 'modules/core/client/img/brand/logo.png',
  favicon: 'modules/core/client/img/brand/favicon.ico',
  uploads: {
    diskStorage: {
      destination: function (req, file, cb) {
        cb (null, 'public/uploads/')
      },
      filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        // console.log ('file.originalname', file.originalname);
        cb (null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
      }
    },
    profileUpload: {
      dest: 'public/uploads/', // Profile upload destination path
      display: 'uploads/',
      // dest: 'modules/users/client/img/profile/uploads/', // Profile upload destination path
      limits: {
        fileSize: 1 * 1024 * 1024 // Max file size in bytes (1 MB)
      }
    },
    fileUpload: {
      dest: 'public/uploads/', // File upload destination path
      display: 'uploads/',
      limits: {
        fileSize: 3 * 1024 * 1024 // Max file size in bytes (3 MB)
      }
    }
  },
  shared: {
    owasp: {
      allowPassphrases: true,
      maxLength: 128,
      minLength: 10,
      minPhraseLength: 20,
      minOptionalTestsToPass: 4
    }
  },
  secure: {
    ssl: true,
    privateKey: './config/sslcerts/key.pem',
    certificate: './config/sslcerts/cert.pem',
    caBundle: './config/sslcerts/chain.pem'
  },
  db: {
    uri: process.env.MONGOHQ_URL || process.env.MONGODB_URI || 'mongodb://' + (process.env[`${databaseServiceName}_SERVICE_HOST`] || 'localhost') + ':27017' + '/' + (process.env.MONGODB_DATABASE || 'mean') + replicaSetString,
    options: {
      user: process.env.MONGODB_USER || '',
      pass: process.env.MONGODB_PASSWORD || '',
      autoReconnect: true,
      reconnectTries: Number.MAX_VALUE,
      reconnectInterval: 1000
    },
    // Enable mongoose debug mode
    debug: process.env.MONGODB_DEBUG || false
  },
  log: {
    // logging with Morgan - https://github.com/expressjs/morgan
    // Can specify one of 'combined', 'common', 'dev', 'short', 'tiny'
    //
    // cc:logging: modified apache format including internal user identification
    //
    format: ':remote-addr - :userid - [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :referrer',
    fileLogger: {
      directoryPath: process.env.LOG_DIR_PATH || process.cwd(),
      fileName: process.env.LOG_FILE || 'app.log',
      maxsize: 10485760,
      maxFiles: 2,
      json: false
    }
  },
  github: {
    clientID: process.env.GITHUB_ID || 'APP_ID',
    clientSecret: process.env.GITHUB_SECRET || 'APP_SECRET',
    callbackURL: '/api/auth/github/callback',
    personalAccessToken: process.env.GITHUB_ACCESS_TOKEN || 'GITHUB_ACCESS_TOKEN'
  },
  mailer: {
    from: process.env.MAILER_FROM || '"BC Developer\'s Exchange" <noreply@bcdevexchange.org>',
    options: {
      host: process.env.MAILER_HOST || 'apps.smtp.gov.bc.ca',
      port: process.env.MAILER_PORT || 25,
      secure: false,
      connectionTimeout: 30000,
      greetingTimeout: 30000,
      ignoreTLS: false,
      tls: {
        rejectUnauthorized: false
      }
    }
  }
};
