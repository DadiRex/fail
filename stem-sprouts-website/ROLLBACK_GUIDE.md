# 🚨 Rollback Guide - Emergency Recovery

## 🎯 **Quick Rollback (Your Plan)**
```bash
# Navigate to server directory
cd "C:\Users\tmpba\OneDrive\Desktop\stem-sprouts-website\backend\server"

# Restore from backup
copy server.backup.js server.js

# Start server
npm run dev
```

## 📋 **Backup Strategy**

### **Automatic Backups**
- ✅ `server.backup.js` - Your working version before hardening
- ✅ `server.js` - Current hardened version
- ✅ Git history - Every change is tracked

### **Manual Backup (Before Major Changes)**
```bash
# Create timestamped backup
copy server.js server.backup.$(Get-Date -Format "yyyyMMdd-HHmmss").js

# Or use PowerShell
Copy-Item server.js "server.backup.$(Get-Date -Format 'yyyyMMdd-HHmmss').js"
```

## 🔄 **Rollback Scenarios**

### **Scenario 1: Hardened Server Won't Start**
```bash
# Quick rollback to working version
copy server.backup.js server.js
npm run dev
```

### **Scenario 2: New Endpoints Not Working**
```bash
# Test individual endpoints
npm run test

# If tests fail, rollback
copy server.backup.js server.js
npm run dev
```

### **Scenario 3: Dependencies Causing Issues**
```bash
# Remove node_modules and reinstall
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install

# If still broken, rollback
copy server.backup.js server.js
npm run dev
```

## 🛠️ **Advanced Recovery Options**

### **Git-Based Rollback**
```bash
# See recent commits
git log --oneline -10

# Rollback to specific commit
git reset --hard <commit-hash>

# Or rollback last commit
git reset --hard HEAD~1
```

### **Selective File Recovery**
```bash
# Restore specific files from git
git checkout HEAD~1 -- server.js

# Or restore from specific commit
git checkout <commit-hash> -- server.js
```

## 📊 **Health Check After Rollback**

### **Verify Server is Running**
```bash
# Test health endpoint
Invoke-RestMethod http://localhost:3000/healthz

# Should return: {"ok": true}
```

### **Test Core Functionality**
```bash
# Test the working /api/ask endpoint
Invoke-RestMethod -Uri "http://localhost:3000/api/ask" -Method POST -ContentType "application/json" -Body '{"question":"Test question"}'
```

## 🔍 **Troubleshooting Rollback Issues**

### **If Rollback Doesn't Work**
1. **Check file permissions**
   ```bash
   Get-Acl server.js
   ```

2. **Verify backup file exists**
   ```bash
   ls server.backup.js
   ```

3. **Check for syntax errors**
   ```bash
   & "C:\Program Files\nodejs\node.exe" -c server.js
   ```

4. **Restart PowerShell** (sometimes needed for file locks)

### **If Server Still Won't Start**
1. **Kill all Node processes**
   ```bash
   Get-Process -Name "node" | Stop-Process -Force
   ```

2. **Clear port conflicts**
   ```bash
   netstat -ano | findstr :3000
   ```

3. **Try different port**
   ```bash
   $env:PORT=3001; npm run dev
   ```

## 📝 **Rollback Checklist**

- [ ] **Stop current server** (Ctrl+C or kill process)
- [ ] **Navigate to server directory**
- [ ] **Create backup of current broken version** (optional)
- [ ] **Restore from working backup**
- [ ] **Start server**
- [ ] **Test health endpoint**
- [ ] **Test core functionality**
- [ ] **Document what went wrong**

## 🎯 **Prevention Strategies**

### **Before Making Changes**
1. **Always backup first**
   ```bash
   copy server.js server.backup.js
   ```

2. **Test in isolation**
   ```bash
   npm run lint
   npm run test
   ```

3. **Use git commits frequently**
   ```bash
   git add .
   git commit -m "Working state before changes"
   ```

### **Safe Deployment Pattern**
1. **Backup** → `copy server.js server.backup.js`
2. **Test** → `npm run lint && npm run test`
3. **Deploy** → Replace server.js
4. **Verify** → Test endpoints
5. **Rollback if needed** → `copy server.backup.js server.js`

## 🚀 **Your Rollback Plan is Perfect Because:**

✅ **Simple** - One command to restore
✅ **Fast** - Instant recovery
✅ **Reliable** - Uses proven working code
✅ **Safe** - No data loss
✅ **Tested** - You know the backup works

## 📞 **Emergency Contacts**

- **Backup Location**: `server.backup.js`
- **Working Directory**: `C:\Users\tmpba\OneDrive\Desktop\stem-sprouts-website\backend\server`
- **Recovery Command**: `copy server.backup.js server.js && npm run dev`

**Remember: Your rollback plan is your safety net. Use it whenever you're unsure about changes!** 🛡️ 