

/*
 * Case Service
 * Cases are records of service or support requests from an account or individual customer used to track interactions with the requestor. Cases also record details like how much time has passed since the case was created, what actions were taken to resolve the issue, priority or associated products, and much more.  Use this API to view, create, and manage your cases.
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

package com.sap.cnsmodules.model;

import java.util.Arrays;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Objects;
import java.util.Set;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonTypeName;
import com.fasterxml.jackson.annotation.JsonValue;
import java.io.Serializable;
import com.fasterxml.jackson.annotation.JsonAnySetter;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import com.fasterxml.jackson.annotation.JsonTypeName;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

/**
 * CaseQueryResponseInfoDetailsInner
 */

// CHECKSTYLE:OFF
public class CaseQueryResponseInfoDetailsInner 
// CHECKSTYLE:ON
{
  @JsonProperty("message")
  private String message;

  @JsonProperty("target")
  private String target;

  @JsonProperty("code")
  private String code;

  @JsonAnySetter
  private final Map<String, Object> cloudSdkCustomFields = new LinkedHashMap<>();

   /**
   * Set the message of this {@link CaseQueryResponseInfoDetailsInner} instance and return the same instance.
   *
   * @param message  The message of this {@link CaseQueryResponseInfoDetailsInner}
   * @return The same instance of this {@link CaseQueryResponseInfoDetailsInner} class
   */
   @Nonnull public CaseQueryResponseInfoDetailsInner message(@Nonnull final String message) {
    this.message = message;
    return this;
  }

   /**
   * Get message
   * @return message  The message of this {@link CaseQueryResponseInfoDetailsInner} instance.
  **/
  @Nonnull public String getMessage() {
    return message;
  }

  /**
  * Set the message of this {@link CaseQueryResponseInfoDetailsInner} instance.
  *
  * @param message  The message of this {@link CaseQueryResponseInfoDetailsInner}
  */
  public void setMessage( @Nonnull final String message) {
    this.message = message;
  }

   /**
   * Set the target of this {@link CaseQueryResponseInfoDetailsInner} instance and return the same instance.
   *
   * @param target  The target of this {@link CaseQueryResponseInfoDetailsInner}
   * @return The same instance of this {@link CaseQueryResponseInfoDetailsInner} class
   */
   @Nonnull public CaseQueryResponseInfoDetailsInner target(@Nonnull final String target) {
    this.target = target;
    return this;
  }

   /**
   * Get target
   * @return target  The target of this {@link CaseQueryResponseInfoDetailsInner} instance.
  **/
  @Nonnull public String getTarget() {
    return target;
  }

  /**
  * Set the target of this {@link CaseQueryResponseInfoDetailsInner} instance.
  *
  * @param target  The target of this {@link CaseQueryResponseInfoDetailsInner}
  */
  public void setTarget( @Nonnull final String target) {
    this.target = target;
  }

   /**
   * Set the code of this {@link CaseQueryResponseInfoDetailsInner} instance and return the same instance.
   *
   * @param code  The code of this {@link CaseQueryResponseInfoDetailsInner}
   * @return The same instance of this {@link CaseQueryResponseInfoDetailsInner} class
   */
   @Nonnull public CaseQueryResponseInfoDetailsInner code(@Nonnull final String code) {
    this.code = code;
    return this;
  }

   /**
   * Get code
   * @return code  The code of this {@link CaseQueryResponseInfoDetailsInner} instance.
  **/
  @Nonnull public String getCode() {
    return code;
  }

  /**
  * Set the code of this {@link CaseQueryResponseInfoDetailsInner} instance.
  *
  * @param code  The code of this {@link CaseQueryResponseInfoDetailsInner}
  */
  public void setCode( @Nonnull final String code) {
    this.code = code;
  }

  /**
   * Get the names of the unrecognizable properties of the {@link CaseQueryResponseInfoDetailsInner}.
   * @return The set of properties names
   */
  @Nonnull
  public Set<String> getCustomFieldNames() {
    return cloudSdkCustomFields.keySet();
  }

  /**
   * Get the value of an unrecognizable property of the {@link CaseQueryResponseInfoDetailsInner}.
   * @param name  The name of the property
   * @return The value of the property
   * @throws NoSuchElementException  If no property with the given name could be found.
   */
  @Nullable
  public Object getCustomField(@Nonnull final String name) throws NoSuchElementException {
    if( !cloudSdkCustomFields.containsKey(name) ) {
        throw new NoSuchElementException("CaseQueryResponseInfoDetailsInner has no field with name '" + name + "'.");
    }
    return cloudSdkCustomFields.get(name);
  }

  @Override
  public boolean equals(@Nullable final java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    final CaseQueryResponseInfoDetailsInner caseQueryResponseInfoDetailsInner = (CaseQueryResponseInfoDetailsInner) o;
    return Objects.equals(this.cloudSdkCustomFields, caseQueryResponseInfoDetailsInner.cloudSdkCustomFields) &&
        Objects.equals(this.message, caseQueryResponseInfoDetailsInner.message) &&
        Objects.equals(this.target, caseQueryResponseInfoDetailsInner.target) &&
        Objects.equals(this.code, caseQueryResponseInfoDetailsInner.code);
  }

  @Override
  public int hashCode() {
    return Objects.hash(message, target, code, cloudSdkCustomFields);
  }

  @Override
  @Nonnull public String toString() {
    final StringBuilder sb = new StringBuilder();
    sb.append("class CaseQueryResponseInfoDetailsInner {\n");
    sb.append("    message: ").append(toIndentedString(message)).append("\n");
    sb.append("    target: ").append(toIndentedString(target)).append("\n");
    sb.append("    code: ").append(toIndentedString(code)).append("\n");
    cloudSdkCustomFields.forEach((k,v) -> sb.append("    ").append(k).append(": ").append(toIndentedString(v)).append("\n"));
    sb.append("}");
    return sb.toString();
  }

  /**
   * Convert the given object to string with each line indented by 4 spaces
   * (except the first line).
   */
  private String toIndentedString(final java.lang.Object o) {
    if (o == null) {
      return "null";
    }
    return o.toString().replace("\n", "\n    ");
  }

}

