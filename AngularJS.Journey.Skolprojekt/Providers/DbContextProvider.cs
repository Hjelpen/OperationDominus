using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AngularJS.Journey.Skolprojekt.Providers
{
    public class DbContextProvider
    {

        private static DbContextProvider instance = new DbContextProvider();

        private DataAcess.DbContext dbContext;

        public DataAcess.DbContext DbContext
        {
            get
            {
                if (dbContext == null)
                    dbContext = new DataAcess.DbContext();
                return dbContext;
            }
        }

        private DbContextProvider()
        {
            dbContext = new DataAcess.DbContext();
        }

        public void DisposeContext()
        {
            dbContext.Dispose();
            dbContext = null;
        }

        public static DbContextProvider Instance { get { return instance; }  }

    }
}