FROM public.ecr.aws/lambda/nodejs:16

RUN yum -y install samba samba-client cifs-utils && yum -y clean all  && rm -rf /var/cache
 
COPY dist/handler.js ./
 
# You can overwrite command in `serverless.yml` template
CMD ["handler.main"]