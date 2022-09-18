# 删除dist打包文件
rm -r ./dist

npm run build

echo "开始连接服务器"

ssh root@8.129.120.231 "cd /usr/share/nginx/html/dist;rm -r *;"

echo "连接服务器成功"

# 密码： Kk19950903
echo "执行上传部署包，请输入密码"

scp -r ./dist/* root@8.129.120.231:/usr/share/nginx/html/dist

# nginx -s reload

echo "部署成功"
