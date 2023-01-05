# Zira SDK

This npm package contains common functionality to enable reuse of common functionality adapters


installation: `npm i @zira/common`

## `parseEmail`

This middleware will add email object to the adapter `event` argument

-   headers is an array of headers in the same order as found from the message (topmost headers first).
    -   headers[].key is lowercase key of the header line, eg. `"dkim-signature"`
    -   headers[].value is the unprocessed value of the header line
-   from, sender, replyTo includes a processed object for the corresponding headers
    -   from.name is decoded name (empty string if not set)
    -   from.address is the email address
-   deliveredTo, returnPath is the email address from the corresponding header
-   to, cc, bcc includes an array of processed objects for the corresponding headers
    -   to[].name is decoded name (empty string if not set)
    -   to[].address is the email address
-   subject is the email subject line
-   messageId, inReplyTo, references includes the value as found from the corresponding header without any processing
-   date is the email sending time formatted as an ISO date string (unless parsing failed and in this case the original value is used)
-   html is the HTML content of the message as a string
-   text is the plaintext content of the message as a string
-   attachments is an array that includes message attachments
    -   attachment[].filename is the file name if provided
    -   attachment[].mimeType is the MIME type of the attachment
    -   attachment[].disposition is either "attachment", "inline" or `null` if disposition was not provided
    -   attachment[].related is a boolean value that indicats if this attachment should be treated as embedded image
    -   attachment[].contentId is the ID from Content-ID header
    -   attachment[].content is an ArrayBuffer that contains the attachment file

## `readCsv`

This function returns the data of csv file 

## `readXls`

This function returns the data of xls file 
