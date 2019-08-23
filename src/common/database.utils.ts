var mysql = require('mysql');
import { LoggerUtils } from './logger.utils';

export class DatabaseUtils {
  private connectionPool: any = null;

  connect(host: string, port: string, user: string, password: string, database: string) {
    if (host.indexOf(':') > 0 && port == null) {
      port = host.substring(host.indexOf(':') + 1);
      host = host.substring(0, host.indexOf(':'));
    }
    this.connectionPool = mysql.createPool({
      host: host,
      user: user,
      password: password,
      port: port,
      database: database
    });
  }

  createTable(sql: string) {
    if (this.connectionPool != null) {
      this.connectionPool.getConnection(function (err, conn) {
        if (err) {
          LoggerUtils.error("[CONNECT POOL] - " + err.message);
          return;
        }

        conn.query(sql, function (err, rows) {
          if (err) {
            LoggerUtils.error('[CREATE TABLE] - ' + err.message);
          }
          conn.release();
        });
      });
    }
  }

  query(sql: string, params: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.connectionPool.getConnection(function (err, connection) {
        if (err) {
          LoggerUtils.error("[CONNECT POOL] - " + err.message);
          reject(err);
          return;
        }

        connection.query(sql, params, function (err, rows) {
          if (err) {
            LoggerUtils.error('[QUERY ERROR] - ' + err.message);
            reject(err);
          }
          else {
            resolve(rows);
          }
          connection.release();
        });
      })
    });
  }
}